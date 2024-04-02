import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../shared/prisma";
import { IFoundItem } from "./foundItem.interface";

async function createNewFoundItem(payload: IFoundItem, userId: string | undefined) {
    const { categoryId, description, foundItemName, location } = payload || {};

    if (!userId) {
        throw new AppError(httpStatus.NOT_ACCEPTABLE, "UserId is not provide.")
    }

    return prisma.foundItem.create({
        data: {
            categoryId,
            description,
            foundItemName,
            location,
            userId
        },
        include: {
            user: true,
            category: true
        }
    })
}

export const foundItemService = {
    createNewFoundItem
}