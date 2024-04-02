import { z } from "zod";

export const createFoundValidationSchema = z.object({
    categoryId: z.string({ required_error: "CategoryId is required." }),
    foundItemName: z.string({ required_error: "Found Item Name is required." }),
    description: z.string({ required_error: "Description is required." }),
    location: z.string({ required_error: "Location is required." })
});