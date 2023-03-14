/**
 * mongoose.service.ts
 */

import mongoose from 'mongoose';
import { systemMessages } from '../configs/strings';
import logger, { Level } from '../utils/logger';

const {
    server: { MONGODB_CONNECTED, MONGODB_DISCONNECTED, MONGOOSE_CONNECTING }
} = systemMessages;

export default (uri: string): void => {
    mongoose.connection.on('connected', () => {
        logger.log(Level.Info, MONGODB_CONNECTED(uri));
    });

    mongoose.connection.on('disconnected', () => {
        logger.log(Level.Info, MONGODB_DISCONNECTED(uri));
    });

    mongoose.connection.on('error', err => {
        logger.log(Level.Error, err);
        process.exit(1);
    });

    logger.log(Level.Info, MONGOOSE_CONNECTING(uri));

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
};
