import { ClaimStatus } from "@prisma/client";

export interface IClaim {
    foundItemId: string;
    distinguishingFeatures: string;
    lostDate: Date
}

export interface IClaimStatus {
    status: ClaimStatus
}