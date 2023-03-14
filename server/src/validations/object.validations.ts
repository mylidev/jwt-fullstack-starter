/**
 * object.validations.ts
 */

import { check } from 'express-validator';

export default {
    getObjectsByFilter: [check('name').notEmpty().trim()],
    createObject: [check('name').notEmpty().trim()],
    updateObject: [check('name').notEmpty().trim()],
    createTemplate: [check('name').notEmpty().trim()],
    updateTemplate: [check('name').notEmpty().trim()]
};
