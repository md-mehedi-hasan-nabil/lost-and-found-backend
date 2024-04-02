import { Request, Response } from "express";
import { handleAsyncRequest } from "../../utils/handleAsyncRequest";
import { categoryService } from "./category.service";
import { createJsonResponse } from "../../utils/createJsonResponse";
import httpStatus from "http-status";

const getAllCategories = handleAsyncRequest(async (req: Request, res: Response) => {
    const result = await categoryService.findCategories()

    res.status(httpStatus.OK).json(createJsonResponse.success(httpStatus.OK, "Found item categories reported successfully", result))
})

const createCategory = handleAsyncRequest(async (req: Request, res: Response) => {
    const result = await categoryService.createCategory(req.body)

    res.status(httpStatus.CREATED).json(createJsonResponse.success(httpStatus.CREATED, "Found item category created successfully", result))
})

export const categoryController = {
    createCategory, getAllCategories
}
