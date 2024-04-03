import { Router } from "express";
import { verifyAuthToken } from "../../middlewares/verifyAuthToken";
import { validateRequestData } from "../../middlewares/validateRequestData";
import { createFoundValidationSchema } from "./foundItem.validator";
import { foundItemController } from "./foundItem.controller";

const router = Router();

/**
 * 4. Create Report a Found Item
 * 5. Get Paginated and Filtered Found Items
 */

router.get("/found-items", foundItemController.getAllFoundItems);
router.post("/found-items", verifyAuthToken,
    validateRequestData(createFoundValidationSchema), foundItemController.createFoundItem);

export default router;
