import { Router } from "express";
import { verifyAuthToken } from "../../middlewares/verifyAuthToken";
import { validateRequestData } from "../../middlewares/validateRequestData";
import { createFoundValidationSchema } from "./foundItem.validator";

const router = Router();

/**
 * create foundItem
 * 4. Report a Found Item
 * 5. Get Paginated and Filtered Found Items
 */

router.get("/found-items", verifyAuthToken, validateRequestData(createFoundValidationSchema));
router.post("/found-items");