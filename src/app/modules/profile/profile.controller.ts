import { Request, Response } from "express"
import { handleAsyncRequest } from "../../utils/handleAsyncRequest"
import { profileService } from "./profile.service"
import { createJsonResponse } from "../../utils/createJsonResponse"
import httpStatus from "http-status"
import { IDecodedUser } from "../../interfaces"

const getUserProfile = handleAsyncRequest(async (req: Request & { user?: IDecodedUser }, res: Response) => {
    const user = req?.user;
    const result = await profileService.findProfile(user as IDecodedUser)

    res.status(httpStatus.OK).json(createJsonResponse.success(httpStatus.OK, "Profile retrieved successfully", result))
})

const updateProfileInfo = handleAsyncRequest(async (req: Request & { user?: IDecodedUser }, res: Response) => {
    const user = req?.user;
    const result = await profileService.updateProfile(req.body, user as IDecodedUser)

    res.status(httpStatus.OK).json(createJsonResponse.success(httpStatus.OK, "User profile updated successfully", result))
})

export const profileController = {
    getUserProfile,
    updateProfileInfo
}