import { Router } from "express";
import { validateRequestData } from "../../middlewares/validateRequestData";
import { userCreateValidationSchema } from "./user.validator";
import { userController } from "./user.controller";
import verifyAuthToken from "../../middlewares/verifyAuthToken";

/**
 * 1. User Registration
 */
const router = Router();

router.get("/", verifyAuthToken("ADMIN", "USER"), userController.getAllUsers);
// router.get("/get-meta", verifyAuthToken("ADMIN", "USER"), userController.getAllUsers);
router.post("/register", validateRequestData(userCreateValidationSchema), userController.createUser);

export default router;