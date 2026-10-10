import { Request } from "express";
import { PAvailability, PType, Status } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import {
  CreatePropertyPayload,
  updatePropertyPayload,
} from "./landLord.interface";
import { AppError } from "../../utility/AppError";
import httpStatus from "http-status";

const createPropertyIntoDB = async (
  payload: CreatePropertyPayload,
  landLordId: string,
) => {
  const { pName, pLocation, pPrice, pDescription, pImage, type, description } =
    payload;

  const normalizedType = type?.trim().toUpperCase() as PType;
  const pType = Object.values(PType);
  if (!pType.includes(normalizedType)) {
    throw new AppError(
      "Invalid property type provided. Type must be APARTMENT or apartment, HOUSE or house, STUDIO or studio, OFFICE or office, SHOP or shop, WAREHOUSE or warehouse, LAND or land, OTHER or other and if you are not sure just leave blank.",
      httpStatus.BAD_REQUEST
    );
  }

  const result = await prisma.property.create({
    data: {
      landLordId,
      pName,
      pLocation,
      pPrice,
      pDescription,
      pImage: pImage ? pImage : "Image not provided",
      category: {
        create: {
          type: normalizedType,
          description: description ? description : "Description not provided",
        },
      },
    },
    select: {
      id: true,
      landLordId: true,
      pName: true,
      pLocation: true,
      pPrice: true,
      pDescription: true,
      pImage: true,
      availability: true,
      feature: true,
      category: {
        select: {
          id: true,
          type: true,
          description: true,
        },
      },
    },
  });
  return result;
};

const updatePropertyInDB = async (
  req: Request,
  id: string,
  payload: updatePropertyPayload,
) => {
  const landLordId = await prisma.property.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      landLordId: true,
    },
  });

  const isOwner = landLordId.landLordId === req.user?.userId;
  const isAdmin = req.user?.role?.toUpperCase() === "ADMIN";

  if (!isOwner && !isAdmin) {
    throw new AppError(
      "You are not the owner of this property.So, you are not authorized to update this property.",
      httpStatus.FORBIDDEN
    );
  }

  const { pName, pLocation, pPrice, pDescription, pImage, type, description, availability } =
    payload;

  let normalizedAvailability: PAvailability | undefined;
  if (availability) {
    const formatted = availability.trim().toUpperCase() as PAvailability;
    if (!Object.values(PAvailability).includes(formatted)) {
      throw new AppError(
        "Invalid availability value. Must be 'AVAILABLE' or 'UNAVAILABLE'.",
        httpStatus.BAD_REQUEST,
      );
    }
    normalizedAvailability = formatted;
  }

  const currentProperty = await prisma.property.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  const result = await prisma.property.update({
    where: {
      id,
    },
    data: {
      pName: pName ? pName : currentProperty.pName,
      pLocation: pLocation ? pLocation : currentProperty.pLocation,
      pPrice: pPrice ? pPrice : currentProperty.pPrice,
      pDescription: pDescription ? pDescription : currentProperty.pDescription,
      pImage: pImage ? pImage : currentProperty.pImage,
      availability: normalizedAvailability ? normalizedAvailability : currentProperty.availability,
      category: {
        update: {
          type: type ? type : currentProperty.category?.type,
          description: description
            ? description
            : currentProperty.category?.description,
        },
      },
    },
    select: {
      id: true,
      landLordId: true,
      pName: true,
      pLocation: true,
      pPrice: true,
      pDescription: true,
      pImage: true,
      availability: true,
      feature: true,
      category: {
        select: {
          id: true,
          type: true,
          description: true,
        },
      },
    },
  });

  return result;
};

const deletePropertyFromDB = async (userId: string, id: string) => {
  const result = await prisma.property.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      landLordId: true,
    },
  });

  if (result.landLordId !== userId) {
    throw new AppError(
      "You are not the owner of this property. So, you are not authorized to delete this property.",
      httpStatus.FORBIDDEN
    );
  }  
  await prisma.property.delete({
    where: {
      id,
    },
  });
};

const rentalRequestsForLandLordsPropertiesFromDB = async (
  landLordId: string,
) => {
  const rentalRequests = await prisma.rentalRequest.findMany({
    where: {
      property: {
        landLordId,
      },
    },
    include: {
      property: {
        select: {
          id: true,
          pName: true,
          pLocation: true,
          pPrice: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return rentalRequests;
};

const approveOrRejectRentalRequestInDB = async (
  userId: string,
  rentalRequestId: string,
  payload: Status
) => {
  const rentalRequest = await prisma.rentalRequest.findUniqueOrThrow({
    where: {
      id: rentalRequestId,
    },
    select: {
      property: {
        select: {
          landLordId: true,
        },
      },
    },
  });

  if (rentalRequest.property.landLordId !== userId) {
    throw new AppError(
      "You are not authorized to approve or reject this rental request as you are not the owner of this property",
      httpStatus.FORBIDDEN
    );
  }

  const result = await prisma.rentalRequest.update({
    where: {
      id: rentalRequestId,
    },
    data: {
      status: payload,
    },
  });
  return result;
};

const getLandlordPropertiesFromDB = async (landLordId: string) => {
  const result = await prisma.property.findMany({
    where: {
      landLordId,
    },
    include: {
      category: true,
      rentalRequest: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

export const landLordService = {
  createPropertyIntoDB,
  updatePropertyInDB,
  deletePropertyFromDB,
  rentalRequestsForLandLordsPropertiesFromDB,
  approveOrRejectRentalRequestInDB,
  getLandlordPropertiesFromDB,
};
