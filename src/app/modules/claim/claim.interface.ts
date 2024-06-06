import { Status } from "@prisma/client";

export interface IClaim {
    itemId: string;
    distinguishingFeatures: string;
    lostDate: Date
}

export interface IClaimStatus {
    status: Status
}