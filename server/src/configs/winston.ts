/**
 * winston.ts
 */

import winston from 'winston';

const { colorize, combine, timestamp, printf } = winston.format;

export const fileTransportOptions = {
    handleExceptions: true,
    level: 'verbose',
    format: combine(
        timestamp(),
        printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message.replace(
                // eslint-disable-next-line no-control-regex
                /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
                ''
            )}`;
        })
    ),
    frequency: '1d',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    filename: 'log_%DATE%.log',
    dirname: 'logs',
    maxSize: '32m'
};

export const consoleTransportOptions = {
    handleExceptions: true,
    level: 'verbose',
    format: combine(
        colorize(),
        timestamp(),
        printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    )
};
