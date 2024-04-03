import { Request } from "express";
import httpStatus from "http-status";
import { Prisma } from "@prisma/client";
import AppError from "../../errors/AppError";
import  prisma  from "../../shared/prisma";
import { IFoundItem } from "./foundItem.interface";

async function getAllFoundItems(req: Request) {
    const { searchTerm, page = 1, limit = 10, sortBy, sortOrder = 'asc', foundItemName, location, description } = req.query || {};

    const foundItemsQuery: Prisma.FoundItemFindManyArgs = {
        where: {},
        orderBy: {},
        take: parseInt(limit as string),
        skip: (parseInt(page as string) - 1) * parseInt(limit as string),
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
    };

    if (foundItemName) {
        (foundItemsQuery.where as Prisma.FoundItemWhereInput).foundItemName = {
            contains: foundItemName as string, mode: 'insensitive'
        }
    }

    if (location) {
        (foundItemsQuery.where as Prisma.FoundItemWhereInput).location = {
            contains: location as string, mode: 'insensitive'
        }
    }

    if (description) {
        (foundItemsQuery.where as Prisma.FoundItemWhereInput).description = {
            contains: description as string, mode: 'insensitive'
        }
    }

    if (sortBy) {
        const orderByField = sortBy as string;
        const order = sortOrder === 'desc' ? 'desc' : 'asc';

        if (orderByField === 'foundItemName') {
            foundItemsQuery.orderBy = {
                foundItemName: order
            }
        }

        if (orderByField === 'foundDate') {
            foundItemsQuery.orderBy = {
                createdAt: order
            };
        }

        if (orderByField === 'category') {
            foundItemsQuery.orderBy = {
                category: {
                    name: order
                }
            }
        }
    }

    if (searchTerm) {
        if (!foundItemsQuery.where) foundItemsQuery.where = {};

        foundItemsQuery.where.OR = [
            { foundItemName: { contains: searchTerm as string, mode: 'insensitive' } },
            { location: { contains: searchTerm as string, mode: 'insensitive' } },
            { description: { contains: searchTerm as string, mode: 'insensitive' } },
        ];
    }

    const total = await prisma.foundItem.count();

    return {
        meta: {
            total,
            page,
            limit
        },
        data: await prisma.foundItem.findMany(foundItemsQuery)
    };
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