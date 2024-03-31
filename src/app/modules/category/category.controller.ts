import { Request, Response } from "express";
import { handleAsyncRequest } from "../../utils/handleAsyncRequest";
import { categoryService } from "./category.service";
import { createJsonResponse } from "../../utils/createJsonResponse";
import httpStatus from "http-status";


const createCategory = handleAsyncRequest(async (req: Request, res: Response) => {
    const result = await categoryService.createCategory(req.body)

    res.status(httpStatus.CREATED).json(createJsonResponse.success(httpStatus.CREATED, "Found item category created successfully", result))
})


export const categoryController = {
    createCategory
}
