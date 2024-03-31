import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../shared/prisma";
import { ICategory } from "./category.interface";


async function createCategory(payload: ICategory) {
    const { name } = payload || {};

    const category = await prisma.foundItemCategory.findFirst({
        where: {
            name
        }
    })

    if (category) {
        throw new AppError(httpStatus.CONFLICT, "This category name already exists")
    }

    return prisma.foundItemCategory.create({
        data: {
            name
        }
    })
}

export const categoryService = {
    createCategory
}