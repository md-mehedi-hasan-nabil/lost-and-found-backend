import { IDecodedUser } from "../../interfaces";
import { prisma } from "../../shared/prisma";
import { IClaim, IClaimStatus } from "./claim.interface";

function findAllClaims() {
    return prisma.claim.findMany()
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

function updateClaim(status: IClaimStatus, claimId: string) {
    return status;
    // return prisma.claim.update({
    //     where: {
    //         id: claimId
    //     },
    //     data: {
    //         status
    //     }
    // })
}

export const claimService = {
    findAllClaims,
    createNewClaim,
    updateClaim
}