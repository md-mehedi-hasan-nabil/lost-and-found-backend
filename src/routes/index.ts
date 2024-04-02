import { Router } from "express";
import userRoutes from "../app/modules/user/user.routes";
import authRoutes from "../app/modules/auth/auth.routes";
import categoryRoutes from "../app/modules/category/category.routes";
import foundItemsRoutes from "../app/modules/foundItem/foundItem.routes";

const router = Router();

const moduleRoutes = [
    {
        path: "/",
        route: userRoutes
    },
    {
        path: "/",
        route: authRoutes
    },
    {
        path: "/",
        route: categoryRoutes
    },
    {
        path: "/",
        route: foundItemsRoutes
    },
]

moduleRoutes.forEach(item => router.use(item.path, item.route))

export default router;