import { Router } from "express";
import { validateRequestData } from "../../middlewares/validateRequestData";
import { categoryCreateValidationSchema } from "./category.validator";
import { categoryController } from "./category.controller";
import { verifyAuthToken } from "../../middlewares/verifyAuthToken";

/**
 * 3. Create Found Item Category
 */
const router = Router();

router.get("/found-item-categories", categoryController.getAllCategories);
router.post("/found-item-categories", validateRequestData(categoryCreateValidationSchema), verifyAuthToken, categoryController.createCategory);

export default router;