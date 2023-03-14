/**
 * logger.middleware.ts
 */

import morgan from 'morgan';
import logger, { Level } from '../utils/logger';

export default morgan('dev', {
    stream: {
        write: (message): void => {
            logger.log(Level.Http, message.replace(/(\r\n|\n|\r)/gm, ''));
        }
    }
});
