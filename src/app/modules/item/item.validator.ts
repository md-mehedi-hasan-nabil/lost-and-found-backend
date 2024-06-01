import { ItemType } from "@prisma/client";
import { z } from "zod";

export const createItemValidationSchema = z.object({
    name: z.string({ required_error: "Name is required" }),
    description: z.string({ required_error: "Description is required" }),
    itemType: z.nativeEnum(ItemType, { required_error: "Item type is required" }),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
    location: z.string({ required_error: "Location is required" }),
    categoryId: z.string().uuid("Invalid category ID format"),
    image_url: z.string().url().optional(),
    contact: z.object({
        email: z.string(),
        phone: z.string()
    }).optional()
});


