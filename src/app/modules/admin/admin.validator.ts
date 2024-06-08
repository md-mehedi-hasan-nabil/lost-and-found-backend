import { z } from "zod";

export const updateUserStatusValidationSchema = z.object({
    status: z.enum(["ACTIVATE", "DEACTIVATE"]),
})