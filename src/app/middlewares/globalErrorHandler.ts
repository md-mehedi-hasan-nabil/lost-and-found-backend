import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import httpStatus from "http-status";
import { createJsonResponse } from '../utils/createJsonResponse';

export const globalErrorHandler: ErrorRequestHandler = (
    error,
    _req: Request,
    res: Response,
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    _next: NextFunction,
) => {
    const statusCode = error?.statusCode ? error.statusCode : httpStatus.INTERNAL_SERVER_ERROR
    const message = error?.message ? error.message : 'Server side error.'

    res.status(statusCode).json(createJsonResponse.error(message, error))
}