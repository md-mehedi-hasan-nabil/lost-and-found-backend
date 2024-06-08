import { Router } from 'express';
import { adminController } from './admin.controller';
import verifyAuthToken from '../../middlewares/verifyAuthToken';
import { validateRequestData } from '../../middlewares/validateRequestData';
import { updateUserStatusValidationSchema } from './admin.validator';

const router = Router()

router.get("/get-meta", verifyAuthToken("ADMIN"), adminController.getAdminMeta);
router.patch("/user-status/:userId", verifyAuthToken("ADMIN"), validateRequestData(updateUserStatusValidationSchema), adminController.updateUserStatus);

export default router;