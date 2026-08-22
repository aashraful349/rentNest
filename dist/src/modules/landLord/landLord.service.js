import { PType } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
const createPropertyIntoDB = async (payload, landLordId) => {
    const { pName, pLocation, pPrice, pDescription, pImage, type, description } = payload;
    const normalizedType = type?.trim().toUpperCase();
    const pType = Object.values(PType);
    if (!pType.includes(normalizedType)) {
        throw new Error("Invalid property type provided. Type must be APARTMENT or apartment, HOUSE or house, STUDIO or studio, OFFICE or office, SHOP or shop, WAREHOUSE or warehouse, LAND or land, OTHER or other and if you are not sure just leave blank.");
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
const updatePropertyInDB = async (req, id, payload) => {
    // console.log("id:",id)
    // console.log("payload:",payload)
    const landLordId = await prisma.property.findUniqueOrThrow({
        where: {
            id,
        },
        select: {
            landLordId: true,
        },
    });
    // console.log(landLordId.landLordId)
    if (landLordId.landLordId != req.user?.userId) {
        throw new Error("You are not the owner of this property.So, you are not authorized to update this property.");
    }
    const { pName, pLocation, pPrice, pDescription, pImage, type, description } = payload;
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
const deletePropertyFromDB = async (id) => {
    await prisma.property.delete({
        where: {
            id,
        },
    });
};
const rentalRequestsForLandLordsPropertiesFromDB = async (landLordId) => {
    const properties = await prisma.property.findMany({
        where: {
            landLordId,
        },
        select: {
            rentalRequest: {
                select: {
                    id: true,
                    propertyId: true,
                    tenantId: true,
                    message: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
        },
    });
    const rentalRequests = properties.flatMap((property) => property.rentalRequest);
    return rentalRequests;
};
const approveOrRejectRentalRequestInDB = async (id, payload) => {
    const result = await prisma.rentalRequest.update({
        where: {
            id
        },
        data: {
            status: payload
        }
    });
    // console.log("result:",result)
    return result;
};
export const landLordService = {
    createPropertyIntoDB,
    updatePropertyInDB,
    deletePropertyFromDB,
    rentalRequestsForLandLordsPropertiesFromDB,
    approveOrRejectRentalRequestInDB
};
//# sourceMappingURL=landLord.service.js.map