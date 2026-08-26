import { prisma } from "../../lib/prisma";
import { AppError } from "../../utility/AppError";
import { rentalRequestPayload } from "./rentalRequest.interface";
import httpStatus from "http-status";

const createRentalRequestInDB = async (
  tenantId: string,
  payload: rentalRequestPayload,
) => {
  const { propertyId, message } = payload;

  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    throw new AppError("Property not found", httpStatus.NOT_FOUND);
  }

  if (property.availability === "UNAVAILABLE") {
    throw new AppError("Property is not available for rent", httpStatus.BAD_REQUEST);
  }

  const result = await prisma.rentalRequest.create({
    data: {
      propertyId,
      tenantId,
      message: message ? message : "No message left by tenant",
    },
  });

  return result;
};

const getAllRentalRequestsFromDB = async (userId: string) => {
  const result = await prisma.rentalRequest.findMany({
    where: {
      tenantId: userId,
    },
    select: {
      id: true,
      propertyId: true,
      tenantId: true,
      status: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  // console.log("result:",result)

  if (result.length === 0) {
    throw new AppError("No rental requests found for this user", httpStatus.NOT_FOUND);
  }

  return result;
};

const getRentalRequestByIdFromDB = async (userId: string, id: string) => {
  const result = await prisma.rentalRequest.findUnique({
    where: {
      id,
    },
    include: {
      property: {
        select: {
          id: true,
          pName: true,
          pLocation: true,
          pPrice: true,
          pDescription: true,
        },
      },
    },
  });

  if (!result) {
    throw new AppError("Rental request not found", httpStatus.NOT_FOUND);
  }

  if (result.tenantId !== userId) {
    throw new AppError("You are not authorized to view this rental request", httpStatus.FORBIDDEN);
  }

  // console.log("result:",result)

  return result;
};

export const rentalRequestService = {
  createRentalRequestInDB,
  getAllRentalRequestsFromDB,
  getRentalRequestByIdFromDB,
};
