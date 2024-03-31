import { prisma } from "../../shared/prisma";
import { IUserRegistration } from "./user.interface";
import bcrypt from "bcrypt";

async function register(payload: IUserRegistration) {
    const { name, email, password } = payload || {};

    await prisma.user.findUniqueOrThrow({
        where: {
            email
        }
    });

    const hashPassword = bcrypt.hashSync(password, 10);

    return prisma.user.create({
        data: {
            name,
            email,
            password: hashPassword
        }
    })
}

export const userService = {
    register
}