import { Router } from 'express';
import { verifyAuthToken } from '../../middlewares/verifyAuthToken';
import { validateRequestData } from '../../middlewares/validateRequestData';
import { createClaimValidationSchema, updateClaimStatusValidationSchema } from './claim.validator';
import { claimController } from './claim.controller';

/**
 * 7. get claim
 * 6. create claim
 * 8. Update Claim Status
 */

const router = Router()

router.get("/claims", verifyAuthToken, claimController.getAllClaims);
router.post("/claims", verifyAuthToken, validateRequestData(createClaimValidationSchema),
    claimController.createClaim);
router.put("/claims/:claimId", verifyAuthToken,
    validateRequestData(updateClaimStatusValidationSchema),
    claimController.updateClaimStatus);

export default router;