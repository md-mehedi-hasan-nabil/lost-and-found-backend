import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../shared/prisma";
import { IUserRegistration } from "./user.interface";
import bcrypt from "bcrypt";

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

    return await prisma.$transaction(async function (tx) {
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
            include: {
                profile: true
            }
        })

        return newUser
    })
}

export const userService = {
    register
}