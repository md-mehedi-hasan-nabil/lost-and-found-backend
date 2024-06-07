import jwt, { JwtPayload, Secret, TokenExpiredError } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import config from '../config';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import { IDecodedUser } from '../interfaces';
import { UserRole, UserStatus } from '@prisma/client';
import prisma from '../shared/prisma';

export default function verifyAuthToken(...userRoles: UserRole[]) {
    return async function (
        req: Request & { user?: IDecodedUser },
        res: Response,
        next: NextFunction,
    ) {
        try {
            const token = req.headers['authorization']

            if (!token) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    'Unauthorized Access',
                    'You do not have the necessary permissions to access this resource.',
                )
            }

            let decodedUser: JwtPayload

            try {
                decodedUser = jwt.verify(token, config.JWT_SECRET as Secret) as JwtPayload;

            } catch (error) {
                if (error instanceof TokenExpiredError) {
                    throw new AppError(
                        httpStatus.UNAUTHORIZED,
                        'Unauthorized Access',
                        'Token has expired. Please log in again.',
                    )
                } else {
                    throw new AppError(
                        httpStatus.UNAUTHORIZED,
                        'Unauthorized Access',
                        'Invalid token. Please log in again.',
                    )
                }
            }

            const { userId, iat } = decodedUser as IDecodedUser

            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                    status: UserStatus.ACTIVATE
                }
            })

            if (user && iat) {
                req.user = decodedUser as IDecodedUser

                if (userRoles && userRoles?.includes(user.role)) {
                    next()
                } else {
                    throw new AppError(
                        httpStatus.UNAUTHORIZED,
                        'Unauthorized Access',
                        'You do not have the necessary permissions to access this resource.',
                    )
                }

            } else {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    'Unauthorized Access',
                    'You do not have the necessary permissions to access this resource.',
                )
            }
        } catch (error) {
            next(error)
        }
    }
}
