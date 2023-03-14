/**
 * account.validation.ts
 */

import { check } from 'express-validator';
import { passwordMinimumLength } from '../configs/numbers';

export default {
    updateAccountDetails: [check('name').optional().notEmpty().trim()],
    updateEmail: [
        check('password').notEmpty(),
        check('newEmail').notEmpty().isEmail()
    ],
    changePassword: [
        check('password').notEmpty(),

        check('newPassword').notEmpty().isLength({ min: passwordMinimumLength })
    ],
    deleteAccount: [check('password').notEmpty()],
    signUp: [
        check('name').notEmpty(),
        check('email').notEmpty().isEmail(),
        check('password').notEmpty().isLength({ min: passwordMinimumLength }),

        check('rememberme').notEmpty().isBoolean()
    ],
    signIn: [
        check('email').notEmpty(),
        check('password').notEmpty(),
        check('rememberme').notEmpty().isBoolean()
    ],
    forgotPassword: [check('email').notEmpty()],
    resetPassword: [
        check('_id').notEmpty(),
        check('token').notEmpty(),
        check('password')
            .optional()
            .notEmpty()
            .isLength({ min: passwordMinimumLength })
    ]
};
