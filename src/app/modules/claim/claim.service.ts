import { IDecodedUser } from "../../interfaces";
import prisma from "../../shared/prisma";
import { IClaim } from "./claim.interface";
import { Status } from "@prisma/client";

async function findAllClaims(user: IDecodedUser) {
    const userId = user?.userId;

    const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId
        }
    })

    if (userInfo?.role === "ADMIN") {
        return prisma.claim.findMany({
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
    } else {
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

async function claimStatusChange(claimId: string, payload: {
    status: Status
}) {
    const { status } = payload

    await prisma.claim.findFirstOrThrow({
        where: {
            id: claimId
        }
    })

    return await prisma.claim.update({
        where: {
            id: claimId
        },
        data: {
            status
        }
    })
}

export const claimService = {
    findAllClaims,
    createNewClaim,
    claimStatusChange
}