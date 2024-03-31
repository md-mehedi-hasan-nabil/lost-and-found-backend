import httpStatus from 'http-status';
import { Request, Response } from "express";
import { handleAsyncRequest } from "../../utils/handleAsyncRequest";
import { createJsonResponse } from '../../utils/createJsonResponse';
import { userService } from './user.service';

const createUser = handleAsyncRequest(async (req: Request, res: Response) => {
    const result = await userService.register(req.body);

    res.status(httpStatus.CREATED).json(createJsonResponse.success(httpStatus.CREATED, "User registered successfully", result))
})

export const userController = {
    createUser
}