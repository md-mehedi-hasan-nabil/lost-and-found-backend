import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IDecodedUser } from "../../interfaces";
import prisma from "../../shared/prisma";
import { IClaim, IClaimStatus } from "./claim.interface";

function findAllClaims() {
    return prisma.claim.findMany({
        select: {
            id: true,
            userId: true,
            foundItemId: true,
            distinguishingFeatures: true,
            lostDate: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            foundItem: {
                select: {
                    id: true,
                    userId: true,
                    categoryId: true,
                    foundItemName: true,
                    description: true,
                    location: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            createdAt: true,
                            updatedAt: true
                        }
                    },
                    category: {
                        select: {
                            id: true,
                            name: true,
                            createdAt: true,
                            updatedAt: true
                        }
                    }
                }
            }
        }
    });
}

function createNewClaim(payload: IClaim, user: IDecodedUser) {
    const userId = user?.userId;
    const { foundItemId, distinguishingFeatures, lostDate } = payload || {};

    return prisma.claim.create({
        data: {
            userId,
            foundItemId,
            distinguishingFeatures,
            lostDate
        }
    })
}

async function updateClaim(payload: IClaimStatus, claimId: string) {
    const claim = await prisma.claim.findUnique({
        where: {
            id: claimId
        }
    })

    if (!claim) {
        throw new AppError(httpStatus.NOT_FOUND, "Claim is not found");
    }

    return prisma.claim.update({
        where: {
            id: claimId
        },
        data: {
            status: payload.status
        }
    })
}

export const claimService = {
    findAllClaims,
    createNewClaim,
    updateClaim
}