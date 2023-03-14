/**
 * Account.ts
 */

import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import mongoose, { Document, Schema } from 'mongoose';
import jwtConfig from '../configs/jwt';
import { passwordHashRounds } from '../configs/numbers';
import { accountMessages } from '../configs/strings';
import logger, { Level } from '../utils/logger';

const {
    server: {
        SAVING_UNMODIFIED,
        SAVING_MODIFIED,
        VALIDATING_PASSWORD,
        VERIFYING_SIGNATURE,
        GENERATING_JWTS,
        GENERATEJWTTOKENS_ERROR
    }
} = accountMessages;

export interface IAccount {
    name: string;
    email: string;
    password: string;
    resetToken?: string;
    resetTokenExpiration?: number;
    lastUsedWorkspace: string;
}

export interface IAccountModel extends IAccount, Document {
    comparePassword(
        password: string,
        callback: (error: Error, same: boolean) => void
    ): void;
    verifyPasswordSignature(signature: string): boolean;
    generateJwtTokens(
        numberOfTokens: number
    ): {
        requestToken: string;
        refreshToken?: string;
        restoreToken?: string;
    };
}

const AccountSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: {
        type: String
    },
    resetTokenExpiration: {
        type: Date
    },
    lastUsedWorkspace: {
        type: mongoose.SchemaTypes.ObjectId
    }
});

AccountSchema.pre('save', function (next) {
    const account = this as IAccountModel;

    if (!account.isModified('password')) {
        logger.log(Level.Verbose, SAVING_UNMODIFIED(account._id));
        return next();
    }

    bcrypt.hash(account.password, passwordHashRounds, (err, hash) => {
        logger.log(Level.Verbose, SAVING_MODIFIED(account._id));
        if (err) {
            return next(err);
        }
        account.password = hash;
        return next();
    });
});

AccountSchema.methods.comparePassword = function (
    password: string,
    callback: (error: Error, same: boolean) => void
): void {
    logger.log(Level.Verbose, VALIDATING_PASSWORD(this._id));
    bcrypt.compare(password, this.password, callback);
};

AccountSchema.methods.verifyPasswordSignature = function (
    signature: string
): boolean {
    logger.log(Level.Verbose, VERIFYING_SIGNATURE(this._id));
    return (
        signature ===
        crypto
            .createHash('sha1')
            .update(this.email + ' ' + this.password)
            .digest('base64')
    );
};

AccountSchema.methods.generateJwtTokens = function (
    numberOfTokens: number
): {
    requestToken: string;
    refreshToken?: string;
    restoreToken?: string;
} {
    logger.log(Level.Verbose, GENERATING_JWTS(numberOfTokens, this._id));

    const payload = {
        sub: this._id,
        signature: crypto
            .createHash('sha1')
            .update(this.email + ' ' + this.password)
            .digest('base64')
    };

    const requestToken = jwt.sign(payload, jwtConfig.Request.SECRET, {
        expiresIn: jwtConfig.Request.EXPIRATION
    });
    let refreshToken: string;
    let restoreToken: string;

    switch (numberOfTokens) {
        case 1:
            return {
                requestToken
            };
        case 2:
            refreshToken = jwt.sign(payload, jwtConfig.Refresh.SECRET, {
                expiresIn: jwtConfig.Refresh.EXPIRATION
            });
            return {
                requestToken,
                refreshToken
            };
        case 3:
            refreshToken = jwt.sign(payload, jwtConfig.Refresh.SECRET, {
                expiresIn: jwtConfig.Refresh.EXPIRATION
            });
            restoreToken = jwt.sign(payload, jwtConfig.Restore.SECRET);
            return {
                requestToken,
                refreshToken,
                restoreToken
            };
        default:
            throw new Error(GENERATEJWTTOKENS_ERROR);
    }
};

export default mongoose.model<IAccountModel>('account', AccountSchema);
