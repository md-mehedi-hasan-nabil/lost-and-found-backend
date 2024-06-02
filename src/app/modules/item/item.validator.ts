import { ItemType } from "@prisma/client";
import { z } from "zod";

export const createItemValidationSchema = z.object({
    name: z.string({ required_error: "Name is required" }),
    description: z.string({ required_error: "Description is required" }),
    itemType: z.nativeEnum(ItemType, { required_error: "Item type is required" }),
    date: z.string({ required_error: "date is required" }),
    time: z.string({ required_error: "time is required" }),
    location: z.string({ required_error: "Location is required" }),
    categoryId: z.string({ required_error: "Category is required" }).uuid("Invalid category ID format"),
    image_url: z.string().url().optional(),
    contact: z.object({
        email: z.string(),
        phone: z.string()
    }).optional()
});


