/**
 * logger.ts
 */

import winston from 'winston';
import 'winston-daily-rotate-file';
import {
    consoleTransportOptions,
    fileTransportOptions
} from '../configs/winston';

export enum Level {
    Error = 'error',
    Warn = 'warn',
    Info = 'info',
    Http = 'http',
    Verbose = 'verbose',
    Debug = 'debug',
    Silly = 'silly'
}

const logger = winston.createLogger({
    transports: [
        new winston.transports.DailyRotateFile(fileTransportOptions),
        new winston.transports.Console(consoleTransportOptions)
    ]
});

export default logger;
