import { body } from 'express-validator';

export const productRules = [
  body('name').trim().notEmpty(),
  body('code').trim().notEmpty(),
  body('price').isFloat({ min: 0 }),
  body('stock').isInt({ min: 0 }),
  body('minStock').optional().isInt({ min: 0 })
];
