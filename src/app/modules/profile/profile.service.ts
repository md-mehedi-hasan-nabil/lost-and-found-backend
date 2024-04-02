import { IDecodedUser } from "../../interfaces";
import { prisma } from "../../shared/prisma";
import { IUpdateProfile } from "./profile.interface";


function findProfile(user: IDecodedUser) {
    const userId = user?.userId;

    return prisma.profile.findUniqueOrThrow({
        where: {
            userId
        },
        select: {
            id: true,
            userId: true,
            bio: true,
            age: true,
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
            }
        }
    })
}

function updateProfile(payload: IUpdateProfile, user: IDecodedUser) {
    const userId = user?.userId;
    const { bio, age } = payload || {};

    return prisma.profile.update({
        where: {
            userId
        },
        data: {
            bio,
            age
        },
        select: {
            id: true,
            userId: true,
            bio: true,
            age: true,
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
            }
        }
    })
}


export const profileService = {
    findProfile,
    updateProfile
}