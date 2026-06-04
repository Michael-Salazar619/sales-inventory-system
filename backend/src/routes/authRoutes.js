import { Router } from 'express';
import * as controller from '../controllers/authController.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { validate } from '../middlewares/validate.js';
import { loginRules, registerRules } from '../validators/authValidators.js';

const router = Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login user
 */
router.post('/register', registerRules, validate, asyncHandler(controller.register));
router.post('/login', loginRules, validate, asyncHandler(controller.login));
router.post('/refresh', asyncHandler(controller.refresh));
router.post('/forgot-password', asyncHandler(controller.forgotPassword));
router.post('/logout', controller.logout);

export default router;
