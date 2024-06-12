import { Router } from "express";
import { validateRequestData } from "../../middlewares/validateRequestData";
import { passwordChangeValidationSchema, userCreateValidationSchema, userLoginValidationSchema } from "./auth.validator";
import { authController } from "./auth.controller";
import verifyAuthToken from "../../middlewares/verifyAuthToken";

const router = Router();

router.post("/login", validateRequestData(userLoginValidationSchema), authController.login);
router.post("/register", validateRequestData(userCreateValidationSchema), authController.createUser);
router.patch("/change-password", verifyAuthToken("ADMIN", "USER"),
    validateRequestData(passwordChangeValidationSchema), authController.changeUserPassword);

export default router;