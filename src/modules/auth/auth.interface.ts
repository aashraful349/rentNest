import { Role } from "../../../generated/prisma/enums"

export type RegisterUserPayload = {
    name: string,
    email:string,
    password:string,
    image?:string,
    bio?:string,
    phone?:string,
    role?:Role,
}

export type LoginUserPayload = {
    email:string,
    password:string,
}