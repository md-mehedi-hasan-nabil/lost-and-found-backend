import { ItemType } from "@prisma/client";

export interface ICreateItem {
    name: string;
    description: string;
    itemType: ItemType;
    date: string;
    time: string
    location: string;
    categoryId: string;
    image_url?: string;
    contact?: {
        email?: string;
        phone?: string;
    }
}