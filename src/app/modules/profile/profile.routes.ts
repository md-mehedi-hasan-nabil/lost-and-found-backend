import { Router } from "express";
import { verifyAuthToken } from "../../middlewares/verifyAuthToken";
import { profileController } from "./profile.controller";


const router = Router();
/**
 * 9. get profile
 * 10. update profile
 * 
 */

router.get("/my-profile", verifyAuthToken, profileController.getUserProfile);

export default router;