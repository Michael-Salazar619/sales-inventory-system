import { Router } from 'express';
import * as controller from '../controllers/reportController.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

const router = Router();

router.use(authenticate, authorize('admin', 'supervisor'));
router.get('/sales.xlsx', asyncHandler(controller.salesExcel));
router.get('/sales.pdf', asyncHandler(controller.salesPdf));

export default router;
