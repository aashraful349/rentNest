import { prisma } from "../../lib/prisma";
import { AppError } from "../../utility/AppError";
import httpStatus from "http-status";

const getAllCategoriesFromDB=async()=>{
    const result=await prisma.category.findMany();
    if(result.length===0){
        throw new AppError("No categories found", httpStatus.NOT_FOUND);
    }
    return result;
}

export const categoriesService={
    getAllCategoriesFromDB,
}