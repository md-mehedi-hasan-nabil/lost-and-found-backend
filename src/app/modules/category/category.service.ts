import { prisma } from "../../shared/prisma";
import { ICategory } from "./category.interface";


function createCategory(payload: ICategory) {
    const { name } = payload || {};

    return prisma.foundItemCategory.create({
        data: {
            name
        }
    })
}

export const categoryService = {
    createCategory
}