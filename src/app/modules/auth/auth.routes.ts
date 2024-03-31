import { Router } from "express";
import { validateRequestData } from "../../middlewares/validateRequestData";
import { userLoginValidationSchema } from "./auth.validator";
import { authController } from "./auth.controller";

/**
 * 2. User Login
 */
const router = Router();

router.post("/login", validateRequestData(userLoginValidationSchema), authController.login);

export default router;