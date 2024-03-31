import { z } from "zod";

export const categoryCreateValidationSchema = z.object({
    name: z.string({ required_error: "Name is required." }),
});