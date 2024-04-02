import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../shared/prisma";
import { IFoundItem } from "./foundItem.interface";

function getAllFoundItems() {
    return prisma.foundItem.findMany({
        select: {
            id: true,
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
    });
}

async function createNewFoundItem(payload: IFoundItem, userId: string | undefined) {
    const { categoryId, description, foundItemName, location } = payload || {};

    if (!userId) {
        throw new AppError(httpStatus.NOT_ACCEPTABLE, "UserId is not provide.")
    }

    return prisma.foundItem.create({
        data: {
            categoryId,
            userId,
            description,
            foundItemName,
            location,
        },
        select: {
            id: true,
            userId: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true
                }
            },
            categoryId: true,
            category: {
                select: {
                    id: true,
                    name: true,
                    createdAt: true,
                    updatedAt: true
                }
            },
            foundItemName: true,
            description: true,
            location: true,
            createdAt: true,
            updatedAt: true
        }
    })
}

export const foundItemService = {
    createNewFoundItem, getAllFoundItems
}