import { Secret } from 'jsonwebtoken';
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { prisma } from "../../shared/prisma";
import { generateToken } from "../../utils/generateToken";
import { IAuthUser } from "./auth.interface";
import bcrypt from "bcrypt";

async function login(payload: IAuthUser) {
    const { email, password } = payload || {};

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email
        }
    })

    const isCorrectPassword = bcrypt.compareSync(password, user.password);

    if (!isCorrectPassword) {
        throw new AppError(httpStatus.NOT_ACCEPTABLE, "Password incorrect!");
    }

    const accessToken = generateToken(payload, config.JWT_SECRET as Secret, config.EXPIRES_IN as string)

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    });

    return {
        ...userData, token: accessToken
    }
}


export const authService = {
    login
}