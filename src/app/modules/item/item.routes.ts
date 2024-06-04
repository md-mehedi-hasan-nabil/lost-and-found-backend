import { itemsController } from './../item/Item.controller';
import { createItemValidationSchema } from './item.validator';
import { Router } from 'express';
import { validateRequestData } from '../../middlewares/validateRequestData';
import { verifyAuthToken } from '../../middlewares/verifyAuthToken';

const router = Router()

router.get("/items", itemsController.getAllItems);
router.get("/items/:itemId", itemsController.getItem);
router.post("/items", verifyAuthToken, validateRequestData(createItemValidationSchema), itemsController.createItem);

export default router;