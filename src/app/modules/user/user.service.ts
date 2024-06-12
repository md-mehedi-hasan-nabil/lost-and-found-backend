import prisma from "../../shared/prisma";

function findAllUsers() {
    return prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            status: true,
            profile: true,
        }
    })
}


export const userService = {
    findAllUsers
}