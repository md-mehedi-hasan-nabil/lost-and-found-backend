import { Router } from "express";
import { profileController } from "./profile.controller";
import { validateRequestData } from "../../middlewares/validateRequestData";
import { updateProfileValidationSchema } from "./profile.valiator";
import verifyAuthToken from "../../middlewares/verifyAuthToken";


const router = Router();
/**
 * 9. get profile
 * 10. update profile
 * 
 */

router.get("/my-profile", verifyAuthToken("ADMIN", "USER"), profileController.getUserProfile);
router.put("/my-profile", verifyAuthToken("ADMIN", "USER"),
    validateRequestData(updateProfileValidationSchema), profileController.updateProfileInfo);

export default router;