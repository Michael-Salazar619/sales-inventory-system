import { Router } from 'express';
import * as controller from '../controllers/saleController.js';
import { authenticate } from '../middlewares/auth.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

const router = Router();

router.use(authenticate);
router.get('/', asyncHandler(controller.index));
router.post('/', asyncHandler(controller.store));

export default router;
