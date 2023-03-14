/**
 * validator.middleware.ts
 */

import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import errorsConfig from '../configs/errors';
import { systemMessages } from '../configs/strings';
import logger, { Level } from '../utils/logger';

const {
    server: { VALIDATING_REQUEST_BODY }
} = systemMessages;

export default (req: Request, res: Response, next: NextFunction): void => {
    logger.log(
        Level.Verbose,
        VALIDATING_REQUEST_BODY(JSON.stringify(req.body))
    );
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
        return;
    }
    next(errorsConfig.requestInvalid);
    return;
};
