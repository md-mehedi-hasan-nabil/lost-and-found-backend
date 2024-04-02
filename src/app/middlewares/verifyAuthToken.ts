import jwt, { Secret, TokenExpiredError } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import config from '../config';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import { IDecodedUser } from '../interfaces';

export function verifyAuthToken(req: Request & { user?: IDecodedUser }, res: Response, next: NextFunction) {
    try {
        const token = req.headers?.authorization;

        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
        }

        try {
            const decodeUser: IDecodedUser = jwt.verify(token, config.JWT_SECRET as Secret) as IDecodedUser;

            req.user = decodeUser;

            next();
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new AppError(httpStatus.UNAUTHORIZED, "Token has expired");
            } else {
                throw new AppError(httpStatus.UNAUTHORIZED, "Token is not verified");
            }
        }
    } catch (error) {
        next(error);
    }
}
