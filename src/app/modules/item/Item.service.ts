import { ItemType, Prisma } from "@prisma/client";
import { IDecodedUser } from "../../interfaces";
import prisma from "../../shared/prisma";
import { ICreateItem } from "./item.interface";
import { Request } from "express";

function findAllItems(req: Request) {
    const itemType = req.query?.type

    const whereCondition: Prisma.ItemWhereInput = {}

    if (itemType) {
        whereCondition.itemType = (itemType as string).toUpperCase() as ItemType
    }

    return prisma.item.findMany({
        where: whereCondition,
        include: {
            category: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    })
}

async function createNewItem(payload: ICreateItem, user: IDecodedUser) {
    const { name, description, itemType, date, location, categoryId, image_url, contact, time } = payload || {};

    let new_contact;

    if (contact) {
        new_contact = await prisma.contact.create({
            data: {
                email: contact?.email ? contact?.email : "",
                phone: contact?.phone ? contact?.phone : ""
            }
        })
    }

    const data: Prisma.ItemCreateInput = {
        name,
        description,
        itemType,
        date: new Date(date),
        location,
        time,
        category: {
            connect: { id: categoryId }
        },
        user: {
            connect: { id: user.userId }
        },
        image_url: image_url ? image_url : null
    };

    if (itemType === "LOST") {
        data.status = "APPROVED"
    }

    if (new_contact && new_contact?.id) {
        data.contact = {
            connect: {
                id: new_contact?.id
            }
        }
    }

    return await prisma.item.create({
        data
    });
}

export const itemsService = {
    findAllItems,
    createNewItem
}