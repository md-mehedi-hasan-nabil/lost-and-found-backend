import { ClaimStatus } from "@prisma/client";
import { z } from "zod";

export const createClaimValidationSchema = z.object({
    foundItemId: z.string({ required_error: "FoundItemId is required." }),
    distinguishingFeatures: z.string({ required_error: "Distinguishing Features is required." }),
    lostDate: z.string({ required_error: "Lost Date is required." })
});

export const updateClaimStatusValidationSchema = z.object({
    status: z.nativeEnum(ClaimStatus)
});
