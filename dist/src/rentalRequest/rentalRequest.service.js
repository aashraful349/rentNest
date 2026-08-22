import { prisma } from "../lib/prisma";
const createRentalRequestInDB = async (tenantId, payload) => {
    const { propertyId, message } = payload;
    const result = await prisma.rentalRequest.create({
        data: {
            propertyId,
            tenantId,
            message: message ? message : "No message left by tenant"
        }
    });
    return result;
};
const getAllRentalRequestsFromDB = async () => {
    const result = await prisma.rentalRequest.findMany();
    // console.log("result:",result)
    return result;
};
const getRentalRequestByIdFromDB = async (id) => {
    const result = await prisma.rentalRequest.findUnique({
        where: {
            id
        }
    });
    // console.log("result:",result)
    return result;
};
export const rentalRequestService = {
    createRentalRequestInDB,
    getAllRentalRequestsFromDB,
    getRentalRequestByIdFromDB
};
//# sourceMappingURL=rentalRequest.service.js.map