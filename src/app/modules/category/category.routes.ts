import { Router } from "express";
import { validateRequestData } from "../../middlewares/validateRequestData";
import { categoryCreateValidationSchema } from "./category.validator";
import { categoryController } from "./category.controller";
import { UserRole } from "@prisma/client";
import verifyAuthToken from "../../middlewares/verifyAuthToken";

/**
 * 3. Create Found Item Category
 */
const router = Router();

router.get("/", categoryController.getAllCategories);
router.post("/", validateRequestData(categoryCreateValidationSchema), verifyAuthToken(UserRole.ADMIN, UserRole.USER), categoryController.createCategory);

export default router;