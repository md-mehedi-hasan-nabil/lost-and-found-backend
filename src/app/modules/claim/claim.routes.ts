import { Router } from 'express';
import { verifyAuthToken } from '../../middlewares/verifyAuthToken';
import { validateRequestData } from '../../middlewares/validateRequestData';
import { createClaimValidationSchema, updateClaimStatusValidationSchema } from './claim.validator';
import { claimController } from './claim.controller';

/**
 * get claim
 * create claim
 * Update Claim Status
 */

const router = Router()

router.get("/", verifyAuthToken, claimController.getAllClaims);
router.post("/", verifyAuthToken, validateRequestData(createClaimValidationSchema),
    claimController.createClaim);
router.put("/:claimId", verifyAuthToken,
    validateRequestData(updateClaimStatusValidationSchema),
    claimController.updateClaimStatus);

export default router;