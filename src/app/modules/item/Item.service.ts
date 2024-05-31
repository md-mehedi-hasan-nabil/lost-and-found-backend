import { Prisma } from "@prisma/client";
import { IDecodedUser } from "../../interfaces";
import prisma from "../../shared/prisma";
import { ICreateItem } from "./item.interface";

function findAllItems() {
    return prisma.item.findMany()
}

async function createNewItem(payload: ICreateItem, user: IDecodedUser) {
    const { name, description, itemType, date, location, categoryId, image_url } = payload;

    const data: Prisma.ItemCreateInput = {
        name,
        description,
        itemType,
        date: new Date(date),
        location,
        category: {
            connect: { id: categoryId }
        },
        user: {
            connect: { id: user.userId }
        },
        image_url: image_url ? image_url : null
    };

    return await prisma.item.create({
        data
    });
}

export const itemsService = {
    findAllItems,
    createNewItem
}