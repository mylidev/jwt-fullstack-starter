/**
 * workspace.routes.ts
 */

import express from 'express';
import { workspaceController } from '../../controllers';
import validate from '../../middlewares/validator.middleware';
import generatePassportMiddleware from '../../services/passport.service';
import { workspaceValidations } from '../../validations';

const router = express.Router();

router.get(
    '/',
    generatePassportMiddleware('request'),
    workspaceController.getWorkspaces
);

router.post(
    '/',
    generatePassportMiddleware('request'),
    workspaceValidations.createWorkspace,
    validate,
    workspaceController.createWorkspace
);

router.get(
    '/:id',
    generatePassportMiddleware('request'),
    workspaceController.getWorkspaceDetails
);

router.post(
    '/:id',
    generatePassportMiddleware('request'),
    workspaceValidations.updateWorkspace,
    validate,
    workspaceController.updateWorkspace
);

router.delete(
    '/:id',
    generatePassportMiddleware('request'),
    workspaceController.deleteWorkspace
);

router.post(
    '/switch/:id',
    generatePassportMiddleware('request'),
    workspaceController.switchWorkspace
);

export default router;
