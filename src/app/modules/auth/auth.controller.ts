import httpStatus from "http-status";
import { createJsonResponse } from "../../utils/createJsonResponse";
import { handleAsyncRequest } from "../../utils/handleAsyncRequest";
import { authService } from "./auth.service";
import { Request, Response } from "express";

const login = handleAsyncRequest(async (req: Request, res: Response) => {
    const result = await authService.login(req.body)

    res.status(httpStatus.OK).json(createJsonResponse.success(httpStatus.OK, "User logged in successfully", result))
})

export const authController = {
    login
}