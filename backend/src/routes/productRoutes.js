import { Router } from 'express';
import * as controller from '../controllers/productController.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { validate } from '../middlewares/validate.js';
import { productRules } from '../validators/productValidators.js';

const router = Router();

router.use(authenticate);
router.get('/', asyncHandler(controller.index));
router.post('/', authorize('admin', 'supervisor'), productRules, validate, asyncHandler(controller.store));
router.put('/:id', authorize('admin', 'supervisor'), productRules, validate, asyncHandler(controller.update));
router.delete('/:id', authorize('admin'), asyncHandler(controller.destroy));

export default router;
