import { Router } from 'express';
import { validateRequestData } from '../../middlewares/validateRequestData';
import { createClaimValidationSchema, updateClaimStatusValidationSchema } from './claim.validator';
import { claimController } from './claim.controller';
import verifyAuthToken from '../../middlewares/verifyAuthToken';

/**
 * get claim
 * create claim
 * Update Claim Status
 */

const router = Router()

router.get("/", verifyAuthToken("ADMIN", "USER"), claimController.getAllClaims);

router.post("/", verifyAuthToken("ADMIN", "USER"), validateRequestData(createClaimValidationSchema),
    claimController.createClaim);

router.patch("/:claimId", verifyAuthToken("ADMIN", "USER"),
    validateRequestData(updateClaimStatusValidationSchema),
    claimController.updateClaimStatus);

export default router;