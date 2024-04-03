import dotenv from "dotenv";
import path from "path"

dotenv.config({
    path: path.join(process.cwd(), '.env')
})

export default {
    PORT: process.env.PORT || 5000,
    DB_URI: process.env.DB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: process.env.EXPIRES_IN
}