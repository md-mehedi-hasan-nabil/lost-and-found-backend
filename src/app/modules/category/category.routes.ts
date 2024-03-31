import { Router } from "express";
import { validateRequestData } from "../../middlewares/validateRequestData";
import { categoryCreateValidationSchema } from "./category.validator";
import { categoryController } from "./category.controller";

/**
 * 3. Create Found Item Category
 */
const router = Router();

router.post("/found-item-categories", validateRequestData(categoryCreateValidationSchema), categoryController.createCategory);

export default router;