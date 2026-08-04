import { PType } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { CreatePropertyPayload } from "./landLord.interface";

const createPropertyIntoDB = async (
  payload: CreatePropertyPayload,
  landLordId: string,
) => {
  const { pName, pLocation, pPrice, pDescription, pImage, type, description } =
    payload;

    const normalizedType=type?.trim().toUpperCase() as PType;
    const pType=Object.values(PType);
    if(!pType.includes(normalizedType)){
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
          type:normalizedType,
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

const updatePropertyIntoDB=()=>{

}

export const landLordService = {
  createPropertyIntoDB,
  updatePropertyIntoDB
};
