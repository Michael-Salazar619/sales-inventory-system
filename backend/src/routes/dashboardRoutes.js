import { Router } from 'express';
import * as controller from '../controllers/dashboardController.js';
import { authenticate } from '../middlewares/auth.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

const router = Router();

router.get('/summary', authenticate, asyncHandler(controller.summary));

export default router;
