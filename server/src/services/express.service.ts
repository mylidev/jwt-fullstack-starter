/**
 * express.service.ts
 */

import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import passport from 'passport';
import apiRouter from '../api/routes';
import corsConfig from '../configs/cors';
import { APP_NAME, systemMessages } from '../configs/strings';
import errorHandler from '../middlewares/error.middleware';
import morganLogger from '../middlewares/logger.middleware';
import logger, { Level } from '../utils/logger';

const {
    server: {
        INITIALIZE_EXPRESS,
        MOUNT_MIDDLEWARES,
        MOUNT_ROUTERS,
        EXPRESS_STARTING,
        EXPRESS_STARTED
    }
} = systemMessages;

logger.log(Level.Verbose, INITIALIZE_EXPRESS);
const app = express();

logger.log(Level.Verbose, MOUNT_MIDDLEWARES);
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(compression());
app.use(cookieParser());
app.use(cors(corsConfig));
app.use(helmet());
app.use(morganLogger);

logger.log(Level.Verbose, MOUNT_ROUTERS);
app.use(apiRouter);

app.use(errorHandler);

export default (port: number): void => {
    logger.log(Level.Info, EXPRESS_STARTING(APP_NAME, port));

    app.listen(port, err => {
        if (err) {
            logger.log(Level.Error, err);
            process.exit(1);
        }
        logger.log(Level.Info, EXPRESS_STARTED(APP_NAME, port));
    });
};
