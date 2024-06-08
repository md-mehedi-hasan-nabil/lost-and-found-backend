import { Request, Response } from "express";
import httpStatus from "http-status";
import { createJsonResponse } from "../../utils/createJsonResponse";
import { handleAsyncRequest } from "../../utils/handleAsyncRequest";
import { claimService } from "./claim.service";
import { IDecodedUser } from "../../interfaces";

const getAllClaims = handleAsyncRequest(async function (req: Request & { user?: IDecodedUser }, res: Response) {
    const user = req.user;
    const result = await claimService.findAllClaims(user as IDecodedUser)

    res.status(httpStatus.OK).json(createJsonResponse.success(httpStatus.OK, "Claims retrieved successfully", result));
})

const createClaim = handleAsyncRequest(async function (req: Request & { user?: IDecodedUser }, res: Response) {
    const user = req.user;
    const result = await claimService.createNewClaim(req.body, user as IDecodedUser);

    res.status(httpStatus.CREATED).json(createJsonResponse.success(httpStatus.CREATED, "Claim created successfully", result));
})

const updateClaimStatus = handleAsyncRequest(async function (req: Request, res: Response) {
    const claimId = req.params["claimId"];
    const result = await claimService.claimStatusChange(claimId, req.body)

    res.status(httpStatus.OK).json(createJsonResponse.success(httpStatus.OK, "Claim update successfully", result));
})

export const claimController = {
    getAllClaims,
    createClaim,
    updateClaimStatus
}
