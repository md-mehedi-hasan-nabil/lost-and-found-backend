/* eslint-disable no-console */
import app from "./app";
import config from "./app/config";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

main().catch(err => console.log(err));

async function main() {
    try {
        await prisma.$disconnect()
        console.log("Database connection successful");

        app.listen(config.PORT, () => {
            console.log(`Server is listening on port ${config.PORT}`);
        })
    } catch (error) {
        console.error(error)
        await prisma.$disconnect();
        process.exit(1);
    }
}
