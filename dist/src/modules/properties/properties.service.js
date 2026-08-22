import { prisma } from "../../lib/prisma";
const getAllPropertiesFromDB = async (filterQuery) => {
    const { location, price, type } = filterQuery;
    let andConditions = [];
    if (location) {
        andConditions.push({
            pLocation: {
                contains: location,
                mode: "insensitive"
            }
        });
    }
    if (price) {
        andConditions.push({
            pPrice: {
                equals: Number(price)
            }
        });
    }
    if (type) {
        andConditions.push({
            category: {
                type: type.trim().toUpperCase(),
            },
        });
    }
    const result = await prisma.property.findMany({
        where: {
            AND: andConditions
        },
        include: {
            category: true,
        }
    });
    return result;
};
const getPropertyByIdFromDB = async (id) => {
    const result = await prisma.property.findUniqueOrThrow({
        where: {
            id
        },
        include: {
            category: true,
        }
    });
    return result;
};
export const propertiesService = {
    getAllPropertiesFromDB,
    getPropertyByIdFromDB,
};
//# sourceMappingURL=properties.service.js.map