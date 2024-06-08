import { Router } from "express";
import userRoutes from "../app/modules/user/user.routes";
import authRoutes from "../app/modules/auth/auth.routes";
import adminRoutes from "../app/modules/admin/admin.routes";
import categoryRoutes from "../app/modules/category/category.routes";
import claimRoutes from "../app/modules/claim/claim.routes";
import profileRoutes from "../app/modules/profile/profile.routes";
import itemsRoutes from "../app/modules/item/item.routes";

const router = Router();

const moduleRoutes = [
    {
        path: "/users",
        route: userRoutes
    },
    {
        path: "/",
        route: authRoutes
    },
    {
        path: "/admin",
        route: adminRoutes
    },
    {
        path: "/categories",
        route: categoryRoutes
    },
    {
        path: "/items",
        route: itemsRoutes
    },
    {
        path: "/claims",
        route: claimRoutes
    },
    {
        path: "/",
        route: profileRoutes
    },
]

moduleRoutes.forEach(item => router.use(item.path, item.route))

export default router;