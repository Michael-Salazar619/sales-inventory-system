import { Router } from 'express';
import * as controller from '../controllers/userController.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

const router = Router();

router.use(authenticate, authorize('admin'));
router.get('/', asyncHandler(controller.index));
router.delete('/:id', asyncHandler(controller.destroy));

export default router;
