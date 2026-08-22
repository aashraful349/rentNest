import { prisma } from "../../lib/prisma";
const badRequest = (message) => {
    const error = new Error(message);
    error.status = 400;
    return error;
};
const createReview = async (tenantId, payload) => {
    const { rentalRequestId, title, description } = payload;
    if (typeof rentalRequestId !== "string" ||
        typeof title !== "string" ||
        typeof description !== "string" ||
        !rentalRequestId.trim() ||
        !title.trim() ||
        !description.trim()) {
        throw badRequest("rentalRequestId, title, and description are required");
    }
    if (title.trim().length > 255) {
        throw badRequest("Title must not exceed 255 characters");
    }
    const rentalRequest = await prisma.rentalRequest.findUnique({
        where: { id: rentalRequestId },
        select: {
            tenantId: true,
            propertyId: true,
            payment: { select: { status: true } },
        },
    });
    if (!rentalRequest || rentalRequest.tenantId !== tenantId) {
        throw badRequest("Rental request not found");
    }
    // A rental-completion state does not exist yet; a completed payment is the
    // available proof that the tenant completed the rental flow.
    if (rentalRequest.payment?.status !== "COMPLETED") {
        throw badRequest("You can review a property only after completing its rental payment");
    }
    const existingReview = await prisma.review.findFirst({
        where: { tenantId, propertyId: rentalRequest.propertyId },
        select: { id: true },
    });
    if (existingReview) {
        throw badRequest("You have already reviewed this property");
    }
    return prisma.review.create({
        data: {
            tenantId,
            propertyId: rentalRequest.propertyId,
            title: title.trim(),
            description: description.trim(),
        },
    });
};
export const reviewService = {
    createReview,
};
//# sourceMappingURL=reviews.service.js.map