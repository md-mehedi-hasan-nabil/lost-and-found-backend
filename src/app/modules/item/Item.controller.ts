import { IDecodedUser } from './../../interfaces/index';
import httpStatus from "http-status";
import { handleAsyncRequest } from "../../utils/handleAsyncRequest";
import { itemsService } from "./Item.service";
import { createJsonResponse } from "../../utils/createJsonResponse";
import { Request, Response } from "express";

const getAllItems = handleAsyncRequest(async function (req: Request, res: Response) {
    const result = await itemsService.findAllItems(req)

    res.status(httpStatus.OK).json(createJsonResponse.success(httpStatus.OK, "Items retrieved successfully", result));
})

const getMyAllItems = handleAsyncRequest(async function (req: Request, res: Response) {
    const result = await itemsService.findMyAllItems(req)

    res.status(httpStatus.OK).json(createJsonResponse.success(httpStatus.OK, "Items retrieved successfully", result));
})

const getItem = handleAsyncRequest(async function (req: Request, res: Response) {
    const result = await itemsService.findItemById(req);

    res.status(httpStatus.OK).json(createJsonResponse.success(httpStatus.OK, "Item retrieved successfully", result));
})

const createItem = handleAsyncRequest(async function (req: Request & { user?: IDecodedUser }, res: Response) {
    const user = req.user;
    const result = await itemsService.createNewItem(req.body, user as IDecodedUser)

    res.status(httpStatus.CREATED).json(createJsonResponse.success(httpStatus.CREATED, "Item create successfully", result));
})

const updateItemStatus = handleAsyncRequest(async function (req: Request & { user?: IDecodedUser }, res: Response) {
    const itemId = req.params["itemId"];
    const result = await itemsService.itemStatusChange(itemId, req.body)

    res.status(httpStatus.OK).json(createJsonResponse.success(httpStatus.OK, "Item update successfully", result));
})

export const itemsController = {
    getAllItems,
    getMyAllItems,
    getItem,
    createItem,
    updateItemStatus
}