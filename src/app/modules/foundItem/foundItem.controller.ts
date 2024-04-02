import { Request, Response } from "express";
import { handleAsyncRequest } from "../../utils/handleAsyncRequest";
import { foundItemService } from "./foundItem.service";
import { IDecodedUser } from "../../interfaces";
import httpStatus from "http-status";
import { createJsonResponse } from "../../utils/createJsonResponse";

const getAllFoundItems = handleAsyncRequest(async function (req: Request, res: Response) {
    const result = await foundItemService.getAllFoundItems();

    res.status(httpStatus.OK).json(createJsonResponse.success(httpStatus.OK, "Found items retrieved successfully", result));
})

const createFoundItem = handleAsyncRequest(async function (req: Request & { user?: IDecodedUser }, res: Response) {
    const userId = req.user?.userId;
    const result = await foundItemService.createNewFoundItem(req.body, userId);

    res.status(httpStatus.CREATED).json(createJsonResponse.success(httpStatus.CREATED, "Found item reported successfully", result));
})

export const foundItemController = {
    createFoundItem, getAllFoundItems
}