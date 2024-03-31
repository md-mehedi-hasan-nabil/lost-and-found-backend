import { NextFunction, Request, Response } from "express";
import { createJsonResponse } from '../utils/createJsonResponse';
import httpStatus from "http-status";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    const message = error?.message || "API Not Found"

    res.status(httpStatus.NOT_FOUND).json(createJsonResponse.error(message, error))

}