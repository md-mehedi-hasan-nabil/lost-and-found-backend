import httpStatus from "http-status";
import { createJsonResponse } from "../../utils/createJsonResponse";
import { handleAsyncRequest } from "../../utils/handleAsyncRequest";
import { authService } from "./auth.service";
import { Request, Response } from "express";
import { IDecodedUser } from "../../interfaces";

const login = handleAsyncRequest(async (req: Request, res: Response) => {
    const result = await authService.login(req.body)

    res.status(httpStatus.OK).json(createJsonResponse.success(httpStatus.OK, "User logged in successfully", result))
})

const createUser = handleAsyncRequest(async (req: Request, res: Response) => {
    const result = await authService.register(req.body)

    res.status(httpStatus.CREATED).json(createJsonResponse.success(httpStatus.CREATED, "User registered successfully", result))
})

const changeUserPassword = handleAsyncRequest(async (req: Request & { user?: IDecodedUser }, res: Response) => {
    const user = req.user
    const result = await authService.changePassword(req.body, user as IDecodedUser)

    res.status(httpStatus.OK).json(createJsonResponse.success(httpStatus.CREATED, "Password change successfully", result))
})

export const authController = {
    login,
    createUser,
    changeUserPassword
}