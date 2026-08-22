import { prisma } from "../../lib/prisma";
import { IReview } from "./reviews.interface"



const createReview=async(payload:IReview,userId:string)=>{


    const{rentalRequestId,title,description}=payload;

    const payment=await prisma.payment.findUnique({
        where:{
            rentalRequestId
        },
        include:{
            user:true,
            rentalRequest:{
                include:{
                    property:true
                }
            }
        }
    })

    if(!payment){
        throw new Error("Payment not found for this rental request");
    }

    // console.log(payment.userId,userId)

    if(payment.userId!==userId){
        throw new Error("You are not authorized to create review for this rental request");
    }

    if(payment.status!=="COMPLETED"){
        throw new Error("Payment is not completed for this rental request");
    }

    // if(payment.userId!==userId){
    //     throw new Error("You are not authorized to create review for this rental request");
    // }

    // console.log("payment:",payment)

    const reviewExists=await prisma.review.findFirst({
        where:{
            rentalRequestId,
            tenantId:userId
        }
    })

    if(reviewExists){
        throw new Error("You have already created a review for this rental request");
    }

    const result=await prisma.review.create({
        data:{
            tenantId:userId,
            propertyId:payment.rentalRequest.propertyId,
            rentalRequestId,
            title,
            description,
        }
    })

    return result;

    

}



const getAllReviewsByPropertyId=async(propertyId:string)=>{

    const result=await prisma.review.findMany({
        where:{
            propertyId
        },
        include:{
            user:{
                select:{
                    name:true,
                    email:true
                }
            }
        }
    })
    console.log("result:",result)

    if(!result[0]){
        throw new Error("No reviews found for this property");
    }

    return result;

}



export const reviewService={
    createReview,
    getAllReviewsByPropertyId
}