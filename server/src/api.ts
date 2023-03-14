/**
 * api.ts
 *
 */

import { port } from './configs/numbers';
import { DATABASE_URI } from './configs/strings';
import expressService from './services/express.service';
import mongooseService from './services/mongoose.service';
import './services/passport.service';

expressService(port);
mongooseService(DATABASE_URI);
