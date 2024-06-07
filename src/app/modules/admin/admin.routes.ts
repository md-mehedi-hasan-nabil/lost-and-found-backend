import { Router } from 'express';
import { adminController } from './admin.controller';
import verifyAuthToken from '../../middlewares/verifyAuthToken';
// import verifyAuthToken from '../../middlewares/verifyAuthToken';

const router = Router()

router.get("/", verifyAuthToken("ADMIN"), adminController.getAdminMeta);

export default router;