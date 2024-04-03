import { Request, Response } from "express";
import { handleAsyncRequest } from "../../utils/handleAsyncRequest";
import { foundItemService } from "./foundItem.service";
import { IDecodedUser } from "../../interfaces";
import httpStatus from "http-status";
import { createJsonResponse } from "../../utils/createJsonResponse";

const getAllFoundItems = handleAsyncRequest(async function (req: Request, res: Response) {
    const { data, meta } = await foundItemService.getAllFoundItems(req);

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: "Found items retrieved successfully",
        meta,
        data
    });
})

const createFoundItem = handleAsyncRequest(async function (req: Request & { user?: IDecodedUser }, res: Response) {
    const userId = req.user?.userId;
    const result = await foundItemService.createNewFoundItem(req.body, userId);

    res.status(httpStatus.CREATED).json(createJsonResponse.success(httpStatus.CREATED, "Found item reported successfully", result));
})

export const foundItemController = {
    createFoundItem, getAllFoundItems
}