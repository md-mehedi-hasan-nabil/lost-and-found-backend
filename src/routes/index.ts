import { Router } from "express";
import userRoutes from "../app/modules/user/user.routes";

const router = Router();

const moduleRoutes = [
    {
        path: "/",
        route: userRoutes
    },
]

moduleRoutes.forEach(item => router.use(item.path, item.route))

export default router;