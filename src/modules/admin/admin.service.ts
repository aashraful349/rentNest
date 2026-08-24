import { ActiveStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utility/AppError";
import httpStatus from "http-status";




const getAllUsers=async()=>{
    const result=await prisma.user.findMany({
        select:{
            id:true,
            name:true,
            email:true,
            role:true,
            activeStatus:true,
            createdAt:true
        }
    })
    // console.log("result:",result)

    if(result.length===0){
        throw new AppError("No users found", httpStatus.NOT_FOUND);
    }
    // console.log("result:",result)

    return result;

}

const updateUserStatus=async(userId:string,status:ActiveStatus)=>{
    const result=await prisma.user.update({
        where:{
            id:userId
        },
        data:{
            activeStatus:status
        },
        select:{
            id:true,
            name:true,
            email:true,
            role:true,
            activeStatus:true,
            createdAt:true,
            updatedAt:true
        }
    })

    return result;

}

const getAllProperties=async()=>{

    const result=await prisma.property.findMany({
        select:{
            id:true,
            landLordId:true,
            pName:true,
            pLocation:true,
            pPrice:true,
            pDescription:true,
            createdAt:true
        }
    })

    if(result.length===0){
        throw new AppError("No properties found", httpStatus.NOT_FOUND);
    }

    return result;

}

const getAllRentalRequests=async()=>{

    const result=await prisma.rentalRequest.findMany({
        select:{
            id:true,
            propertyId:true,
            tenantId:true,
            status:true,
            createdAt:true
        }
    })

    if(result.length===0){
        throw new AppError("No rental requests found", httpStatus.NOT_FOUND);
    }

    return result;

}

export const adminService={
    getAllUsers,
    updateUserStatus,
    getAllProperties,
    getAllRentalRequests

}