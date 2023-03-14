/**
 * routes/index.ts
 */

import express from 'express';
import accountRouter from './account.routes';
import workspaceRouter from './workspace.routes';
import objectRouter from './object.routes';

const router = express.Router();

router.use('/account', accountRouter);
router.use('/workspace', workspaceRouter);
router.use('/object', objectRouter);

export default router;
