/**
 * account.routes.ts
 */

import express from 'express';
import { accountController } from '../../controllers';
import validate from '../../middlewares/validator.middleware';
import generatePassportMiddleware from '../../services/passport.service';
import { accountValidations } from '../../validations';

const router = express.Router();

router.get(
    '/',
    generatePassportMiddleware('request'),
    accountController.getAccountDetails
);
router.post(
    '/',
    generatePassportMiddleware('request'),
    accountValidations.updateAccountDetails,
    validate,
    accountController.updateAccountDetails
);
router.post(
    '/email',
    generatePassportMiddleware('request'),
    accountValidations.updateEmail,
    validate,
    accountController.updateEmail
);
router.post(
    '/password',
    generatePassportMiddleware('request'),
    accountValidations.changePassword,
    validate,
    accountController.changePassword
);
router.delete(
    '/',
    generatePassportMiddleware('request'),
    accountValidations.deleteAccount,
    validate,
    accountController.deleteAccount
);

router.get(
    '/refresh',
    generatePassportMiddleware('refresh'),
    accountController.refreshToken
);
router.get(
    '/restore',
    generatePassportMiddleware('restore'),
    accountController.restoreTokens
);
router.post(
    '/signup',
    accountValidations.signUp,
    validate,
    accountController.signUp
);
router.post(
    '/signin',
    accountValidations.signIn,
    validate,
    accountController.signIn
);
router.get('/signout', accountController.signOut);

router.post(
    '/forgot',
    accountValidations.forgotPassword,
    validate,
    accountController.forgotPassword
);
router.post(
    '/reset',
    accountValidations.resetPassword,
    validate,
    accountController.resetPassword
);

export default router;
