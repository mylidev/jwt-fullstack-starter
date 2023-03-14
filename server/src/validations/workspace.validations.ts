/**
 * workspace.validation.ts
 */

import { check } from 'express-validator';

export default {
    createWorkspace: [check('name').notEmpty().trim()],
    updateWorkspace: [check('name').notEmpty().trim()]
};
