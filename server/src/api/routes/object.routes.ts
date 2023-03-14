/**
 * object.routes.ts
 */

import express from 'express';
import { objectController } from '../../controllers';
import validate from '../../middlewares/validator.middleware';
import generatePassportMiddleware from '../../services/passport.service';
import { objectValidations } from '../../validations';

const router = express.Router();

// GET: /
router.get(
    '/',
    generatePassportMiddleware('request'),
    objectValidations.getObjectsByFilter,
    validate,
    objectController.getObjectsByFilter
);

// GET: /{id}
router.get(
    '/:id',
    generatePassportMiddleware('request'),
    objectController.getObjectDetails
);

// POST: /
router.post(
    '/',
    generatePassportMiddleware('request'),
    objectValidations.createObject,
    validate,
    objectController.createObject
);

// POST: /{id}
router.post(
    '/:id',
    generatePassportMiddleware('request'),
    objectValidations.updateObject,
    validate,
    objectController.updateObject
);

// DELETE: /{id}
router.delete(
    '/:id',
    generatePassportMiddleware('request'),
    objectController.deleteObject
);

// GET: /template
router.get(
    '/template',
    generatePassportMiddleware('request'),
    objectController.getTemplatesByAccount
);

// GET: /template/{id}
router.get(
    '/template/:id',
    generatePassportMiddleware('request'),
    objectController.getTemplateDetails
);

// POST: /template
router.post(
    '/template',
    generatePassportMiddleware('request'),
    objectValidations.createTemplate,
    validate,
    objectController.createTemplate
);

// POST: /template/{id}
router.post(
    '/template/:id',
    generatePassportMiddleware('request'),
    objectValidations.updateTemplate,
    validate,
    objectController.updateTemplate
);

// DELETE: /template/{id}
router.delete(
    '/template/:id',
    generatePassportMiddleware('request'),
    objectController.deleteTemplate
);

export default router;
