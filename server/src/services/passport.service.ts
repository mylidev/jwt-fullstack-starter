/**
 * passport.service.ts
 */

import { NextFunction, Request } from 'express';
import passport from 'passport';
import passportJwt from 'passport-jwt';
import errorsConfig from '../configs/errors';
import jwtConfig from '../configs/jwt';
import { systemMessages } from '../configs/strings';
import AccountModel from '../models/Account';
import logger, { Level } from '../utils/logger';

const {
    server: { GENERATE_STRATEGY }
} = systemMessages;

const JwtStrategy = passportJwt.Strategy;

const strategies = [
    {
        name: 'request',
        secret: jwtConfig.Request.SECRET,
        cookieName: jwtConfig.Request.DOMAIN
    },
    {
        name: 'refresh',
        secret: jwtConfig.Refresh.SECRET,
        cookieName: jwtConfig.Refresh.DOMAIN
    },
    {
        name: 'restore',
        secret: jwtConfig.Restore.SECRET,
        cookieName: jwtConfig.Restore.DOMAIN
    }
];

const cookieExtractor = (cookieName: string) => {
    return (req: Request): string => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies[cookieName];
        }
        return token;
    };
};

for (let i = 0; i < strategies.length; i++) {
    const strategy = strategies[i];

    logger.log(Level.Verbose, GENERATE_STRATEGY(strategy.name));

    passport.use(
        strategy.name,
        new JwtStrategy(
            {
                secretOrKey: strategy.secret,
                jwtFromRequest: cookieExtractor(strategy.cookieName)
            },
            (jwtPayload, done) => {
                AccountModel.findById(jwtPayload.sub, (err, account) => {
                    if (err || !account) {
                        return done(err);
                    }

                    const isSignatureValid = account.verifyPasswordSignature(
                        jwtPayload.signature
                    );

                    if (account && isSignatureValid) {
                        return done(null, account);
                    }
                    return done(null, false);
                });
            }
        )
    );
}

export default (strategy: string): any => {
    return (req: Request, res: Response, next: NextFunction): void => {
        passport.authenticate(strategy, (err, user, info) => {
            if (err) {
                return next(errorsConfig.jwtInvalid);
            }
            if (!user) {
                return next(errorsConfig.jwtInvalid);
            }
            req.logIn(user, { session: false }, err => {
                if (err) {
                    return next(errorsConfig.jwtInvalid);
                }
            });
            return next();
        })(req, res, next);
    };
};
