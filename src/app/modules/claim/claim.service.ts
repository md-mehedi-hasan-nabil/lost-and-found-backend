import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IDecodedUser } from "../../interfaces";
import prisma from "../../shared/prisma";
import { IClaim, IClaimStatus } from "./claim.interface";


function findAllClaims(user: IDecodedUser) {
    const userId = user?.userId;

    return prisma.claim.findMany({
        where: {
            userId
        },
        select: {
            id: true,
            lostDate: true,
            status: true,
            createdAt: true,
            distinguishingFeatures: true,
            item: {
                select: {
                    id: true,
                    image_url: true,
                    name: true
                }
            },
            user: {
                select: {
                    email: true,
                    name: true,
                    profile: {
                        select: {
                            age: true,
                            bio: true
                        }
                    }
                }
            }
        }
    });
}

function createNewClaim(payload: IClaim, user: IDecodedUser) {
    const userId = user?.userId;
    const { itemId, distinguishingFeatures, lostDate } = payload || {};

    return prisma.claim.create({
        data: {
            distinguishingFeatures,
            lostDate,
            userId,
            itemId
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