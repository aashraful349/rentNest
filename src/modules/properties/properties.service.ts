import { PType } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utility/AppError";
import { filterQueryType } from "./properties.interface";
import httpStatus from "http-status";

const getAllPropertiesFromDB = async (filterQuery:filterQueryType) => {


    const {location,price,type}=filterQuery;
    let andConditions:any[]=[];

    if(location){
        andConditions.push({
            pLocation:{
                contains:location,
                mode:"insensitive"
            }
        })
    }

    if(price){
        andConditions.push({
            pPrice:{
                equals:Number(price)
            }
        })
    }

if (type) {
  andConditions.push({
    category: {
      type: (type as string).trim().toUpperCase() as PType,
    },
  });
}


  const result = await prisma.property.findMany({
    where:{
      AND:andConditions
    },
    select:{
      id:true,
      availability:true,
      pName:true,
      pLocation:true,
      pPrice:true,
      category:{
        select:{
          id:true,
          type:true,
        }
      },
      createdAt:true
    }
    
  });
  if(result.length===0){
    throw new AppError("No properties found with the given filter", httpStatus.NOT_FOUND);
  }

  return result;
};


const getPropertyByIdFromDB = async (id:string) => {

  const result = await prisma.property.findUniqueOrThrow({
    where:{
      id
    },
    include:{
        category:true,
    }
  });
  if(!result){
    throw new AppError("Property not found", httpStatus.NOT_FOUND);
  }

  return result;
};




export const propertiesService = {
  getAllPropertiesFromDB,
    getPropertyByIdFromDB,
};
