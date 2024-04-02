import { Router } from "express";
import { verifyAuthToken } from "../../middlewares/verifyAuthToken";
import { profileController } from "./profile.controller";
import { validateRequestData } from "../../middlewares/validateRequestData";
import { updateProfileValidationSchema } from "./profile.valiator";


const router = Router();
/**
 * 9. get profile
 * 10. update profile
 * 
 */

router.get("/my-profile", verifyAuthToken, profileController.getUserProfile);
router.put("/my-profile", verifyAuthToken,
    validateRequestData(updateProfileValidationSchema), profileController.updateProfileInfo);

export default router;