import { body } from 'express-validator';

export const registerRules = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isStrongPassword().withMessage('Password must be strong'),
  body('role').optional().isIn(['admin', 'supervisor', 'empleado'])
];

export const loginRules = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];
