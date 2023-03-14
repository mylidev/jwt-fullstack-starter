/**
 * error.middleware.ts
 */

import { NextFunction, Request, Response } from 'express';
import logger, { Level } from '../utils/logger';
import {
    IError,
    IErrorResponse,
    isError
} from '../types/protocols/error.protocols';
import errorsConfig from '../configs/errors';

export default (
    err: IError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (isError(err)) {
        logger.log(
            err.status < 500 ? Level.Warn : Level.Error,
            `${req.method} ${req.path}: ${err.message} => ${JSON.stringify(
                req.body
            )}`
        );
        res.status(err.status).json({
            error: true,
            type: err.type,
            message: err.message
        } as IErrorResponse);
        return;
    }

    logger.log(
        Level.Error,
        `${req.method} ${req.path} ${
            errorsConfig.uncaughtError.message
        }: ${err} => ${JSON.stringify(req.body)}`
    );
    res.status(errorsConfig.uncaughtError.status).json({
        error: true,
        type: errorsConfig.uncaughtError.type,
        message: errorsConfig.uncaughtError.message
    } as IErrorResponse);
    return;
};
