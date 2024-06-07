import { itemsController } from './../item/Item.controller';
import { createItemValidationSchema } from './item.validator';
import { Router } from 'express';
import { validateRequestData } from '../../middlewares/validateRequestData';
import verifyAuthToken from '../../middlewares/verifyAuthToken';

const router = Router()

router.get("/", itemsController.getAllItems);
router.get("/:itemId", itemsController.getItem);
router.post("/", verifyAuthToken("ADMIN", "USER"), validateRequestData(createItemValidationSchema), itemsController.createItem);

export default router;