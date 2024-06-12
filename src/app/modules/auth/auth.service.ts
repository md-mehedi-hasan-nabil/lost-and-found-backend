import { Secret } from 'jsonwebtoken';
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import prisma from "../../shared/prisma";
import { generateToken } from "../../utils/generateToken";
import { IAuthUser, IChangePassword, IUserRegistration } from "./auth.interface";
import bcrypt from "bcrypt";
import { IDecodedUser } from '../../interfaces';

async function login(payload: IAuthUser) {
    const { email, password } = payload || {};

    const user = await prisma.user.findUnique({
        where: {
            email,
            status: "ACTIVATE"
        }
    })

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User is not found");
    }

    const isCorrectPassword = bcrypt.compareSync(password, user.password);

    if (!isCorrectPassword) {
        throw new AppError(httpStatus.NOT_ACCEPTABLE, "Password incorrect!");
    }

    const tokenPayload = {
        email,
        userId: user.id,
        role: user.role
    }

    const accessToken = generateToken(tokenPayload, config.JWT_SECRET as Secret, config.EXPIRES_IN as string)

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email,
            status: "ACTIVATE"
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

async function register(payload: IUserRegistration) {
    const { name, email, password, profile } = payload || {};

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        throw new AppError(httpStatus.CONFLICT, "This email is already in use.");
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    return await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
            data: {
                name,
                email,
                password: hashPassword,
                profile: {
                    create: {
                        age: profile.age,
                        bio: profile.bio,
                    }
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
                profile: {
                    select: {
                        id: true,
                        userId: true,
                        age: true,
                        bio: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                }
            }
        });

        return newUser;
    });
}

async function changePassword(payload: IChangePassword, authUser: IDecodedUser) {
    const { email } = authUser;
    const { new_password, old_password } = payload

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email,
            status: "ACTIVATE"
        }
    })

    const isCorrectPassword = bcrypt.compareSync(old_password, user.password);

    if (!isCorrectPassword) {
        throw new AppError(httpStatus.NOT_ACCEPTABLE, "Password incorrect!");
    }

    /**
     * change password
     */
    const hashPassword = bcrypt.hashSync(new_password, 10);

    await prisma.user.update({
        where: {
            email,
            status: "ACTIVATE"
        },
        data: {
            password: hashPassword
        }
    })

    const tokenPayload = {
        email,
        userId: user.id,
        role: user.role
    }

    const accessToken = generateToken(tokenPayload, config.JWT_SECRET as Secret, config.EXPIRES_IN as string)

    const userData = await prisma.user.findUnique({
        where: {
            email,
            status: "ACTIVATE"
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
    login,
    register,
    changePassword
}