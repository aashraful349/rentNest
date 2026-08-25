import { prisma } from "../../lib/prisma";
import { AppError } from "../../utility/AppError";
import httpStatus from "http-status";
const createReview = async (payload, userId) => {
    const { rentalRequestId, title, description } = payload;
    const payment = await prisma.payment.findUnique({
        where: {
            rentalRequestId
        },
        include: {
            user: true,
            rentalRequest: {
                include: {
                    property: true
                }
            }
        }
    });
    if (!payment) {
        throw new AppError("Payment not found for this rental request", httpStatus.NOT_FOUND);
    }
    // console.log(payment.userId,userId)
    if (payment.userId !== userId) {
        throw new AppError("You are not authorized to create review for this rental request", httpStatus.FORBIDDEN);
    }
    if (payment.status !== "COMPLETED") {
        throw new AppError("Payment is not completed for this rental request", httpStatus.BAD_REQUEST);
    }
    // if(payment.userId!==userId){
    //     throw new Error("You are not authorized to create review for this rental request");
    // }
    // console.log("payment:",payment)
    const reviewExists = await prisma.review.findFirst({
        where: {
            rentalRequestId,
            tenantId: userId
        }
    });
    if (reviewExists) {
        throw new AppError("You have already created a review for this rental request", httpStatus.BAD_REQUEST);
    }
    const result = await prisma.review.create({
        data: {
            tenantId: userId,
            propertyId: payment.rentalRequest.propertyId,
            rentalRequestId,
            title,
            description,
        }
    });
    return result;
};
const getAllReviewsByPropertyId = async (propertyId) => {
    const result = await prisma.review.findMany({
        where: {
            propertyId
        },
        include: {
            user: {
                select: {
                    name: true,
                    email: true
                }
            }
        }
    });
    console.log("result:", result);
    if (!result[0]) {
        throw new AppError("No reviews found for this property", httpStatus.NOT_FOUND);
    }
    return result;
};
export const reviewService = {
    createReview,
    getAllReviewsByPropertyId
};
//# sourceMappingURL=reviews.service.js.map