import { Router } from "express";
import { validateRequestData } from "../../middlewares/validateRequestData";
import { userCreateValidationSchema } from "./user.validator";
import { userController } from "./user.controller";

/**
 * 1. User Registration
 */
const router = Router();

router.post("/register", validateRequestData(userCreateValidationSchema), userController.createUser);

export default router;