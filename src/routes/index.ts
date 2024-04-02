import { Router } from "express";
import userRoutes from "../app/modules/user/user.routes";
import authRoutes from "../app/modules/auth/auth.routes";
import categoryRoutes from "../app/modules/category/category.routes";
import foundItemRoutes from "../app/modules/foundItem/foundItem.routes";
import claimRoutes from "../app/modules/claim/claim.routes";
import profileRoutes from "../app/modules/profile/profile.routes";

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
        route: foundItemRoutes
    },
    {
        path: "/",
        route: claimRoutes
    },
    {
        path: "/",
        route: profileRoutes
    },
]

moduleRoutes.forEach(item => router.use(item.path, item.route))

export default router;