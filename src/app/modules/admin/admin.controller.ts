import httpStatus from "http-status";
import { adminService } from "./admin.service";
import { handleAsyncRequest } from "../../utils/handleAsyncRequest";
import { IDecodedUser } from "../../interfaces";
import { createJsonResponse } from "../../utils/createJsonResponse";
import { Request, Response } from "express";

const getAdminMeta = handleAsyncRequest(async function (req: Request & { user?: IDecodedUser }, res: Response) {
    const result = await adminService.findDashboardMeta()

    res.status(httpStatus.OK).json(createJsonResponse.success(httpStatus.OK, "Admin meta data retrieved successfully", result));
})

export const adminController = {
    getAdminMeta
}
