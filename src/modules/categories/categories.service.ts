import { prisma } from "../../lib/prisma";

const getAllCategoriesFromDB=async()=>{
    const result=await prisma.category.findMany();
    return result;
}

export const categoriesService={
    getAllCategoriesFromDB,
}