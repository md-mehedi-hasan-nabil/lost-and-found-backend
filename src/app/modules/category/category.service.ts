import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import  prisma  from "../../shared/prisma";
import { ICategory } from "./category.interface";

async function findCategories() {
    return await prisma.itemCategory.findMany();
}

async function createCategory(payload: ICategory) {
    const { name } = payload || {};

    const category = await prisma.itemCategory.findMany({
        where: {
            name
        }
    });

    if (Object.keys(category).length > 0) {
        throw new AppError(httpStatus.CONFLICT, "This category name already exists")
    }

    return prisma.itemCategory.create({
        data: {
            name
        }
    })
}

export const categoryService = {
    createCategory, findCategories
}