import { PType } from "../../../generated/prisma/enums";

export type CreatePropertyPayload = {
  pName: string;
  pLocation: string;
  pPrice: number;
  pDescription: string;
  pImage?: string;
  type :PType;
  description?:string;
};

export type updatePropertyPayload = {
  pName?: string;
  pLocation?: string;
  pPrice?: number;
  pDescription?: string;
  pImage?: string;
  type ?:PType;
  description?:string;
};
