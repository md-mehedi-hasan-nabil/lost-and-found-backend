import { Router } from "express";
import { userController } from "./user.controller";
import verifyAuthToken from "../../middlewares/verifyAuthToken";

/**
 * 1. User Registration
 */
const router = Router();

router.get("/", verifyAuthToken("ADMIN", "USER"), userController.getAllUsers);
// router.get("/get-meta", verifyAuthToken("ADMIN", "USER"), userController.getAllUsers);

export default router;