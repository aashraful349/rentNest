import { PType } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { filterQueryType } from "./properties.interface";

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
    include:{
        category:true,
    }
  });

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

  return result;
};



export const propertiesService = {
  getAllPropertiesFromDB,
    getPropertyByIdFromDB,
};
