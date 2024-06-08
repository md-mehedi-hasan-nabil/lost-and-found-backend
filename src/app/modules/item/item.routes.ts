import { itemsController } from './../item/Item.controller';
import { createItemValidationSchema, updateItemStatusValidationSchema } from './item.validator';
import { Router } from 'express';
import { validateRequestData } from '../../middlewares/validateRequestData';
import verifyAuthToken from '../../middlewares/verifyAuthToken';

const router = Router()

router.get("/", itemsController.getAllItems);
router.get("/my-items", verifyAuthToken("USER"), itemsController.getMyAllItems);
router.get("/:itemId", itemsController.getItem);
router.post("/", verifyAuthToken("ADMIN", "USER"), validateRequestData(createItemValidationSchema), itemsController.createItem);
router.patch("/:itemId", verifyAuthToken("ADMIN"), validateRequestData(updateItemStatusValidationSchema), itemsController.updateItemStatus);

export default router;