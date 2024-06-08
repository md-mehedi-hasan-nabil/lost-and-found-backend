import { ItemType, UserStatus } from "@prisma/client"
import prisma from "../../shared/prisma"

async function findDashboardMeta() {
    const lostItems = await prisma.item.count({
        where: {
            itemType: ItemType.LOST
        }
    })

    const foundItems = await prisma.item.count({
        where: {
            itemType: ItemType.FOUND
        }
    })

    const users = await prisma.user.count({
        where: {
            status: UserStatus.ACTIVATE
        }
    })

    return {
        lostCount: lostItems,
        foundCount: foundItems,
        userCount: users
    }
}

async function userStatusChange(userId: string, payload: {
    status: UserStatus
}) {
    const { status } = payload

    await prisma.user.findFirstOrThrow({
        where: {
            id: userId
        }
    })

    return await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            status
        }
    })
}

export const adminService = {
    findDashboardMeta,
    userStatusChange
}