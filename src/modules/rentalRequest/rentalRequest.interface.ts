import { Status } from "../../../generated/prisma/enums";

export type rentalRequestPayload = {
  propertyId: string;
  message?: string;
};
