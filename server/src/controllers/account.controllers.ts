/**
 * account.controller.ts
 */

import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import errorsConfig from '../configs/errors';
import jwtConfig from '../configs/jwt';
import { resetPasswordEmailOptions } from '../configs/nodemailer';
import { resetTokenExpiration, resetTokenLength } from '../configs/numbers';
import { accountMessages } from '../configs/strings';
import Account, { IAccountModel } from '../models/Account';
import Workspace, { IWorkspaceModel } from '../models/Workspace';
import {
    IChangePasswordRequest,
    IChangePasswordResponse,
    IDeleteAccountRequest,
    IDeleteAccountResponse,
    IForgotPasswordRequest,
    IForgotPasswordResponse,
    IGetAccountDetailsResponse,
    IRefreshTokenResponse,
    IResetPasswordRequest,
    IResetPasswordResponse,
    IRestoreTokensResponse,
    ISignInRequest,
    ISignInResponse,
    ISignOutResponse,
    ISignUpRequest,
    ISignUpResponse,
    IUpdateAccountDetailsRequest,
    IUpdateAccountDetailsResponse,
    IUpdateEmailRequest,
    IUpdateEmailResponse
} from '../types/protocols/account.protocols';
import logger, { Level } from '../utils/logger';
import transporter from '../utils/transporter';
import { isValidObjectId } from 'mongoose';

const {
    client: {
        SIGNED_OUT,
        RESET_PASSWORD_EMAIL_SENT,
        CHECKED_RESET_TOKEN,
        RESETTED_PASSWORD
    },
    server: {
        GETTING_ACCOUNT_DETAILS,
        UPDATING_ACCOUNT_DETAILS,
        UPDATING_EMAIL,
        UPDATING_PASSWORD,
        DELETING_ACCOUNT,
        REFRESHING_JWTS,
        RESTORING_JWTS,
        SIGNING_UP,
        SIGNING_IN,
        SIGNING_OUT,
        SENDING_RESET_EMAIL,
        RESETTING_PASSWORD
    }
} = accountMessages;

export default {
    getAccountDetails: (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        const account = req.user as IAccountModel;
        logger.log(Level.Verbose, GETTING_ACCOUNT_DETAILS(account._id));
        const { _id, name, email, lastUsedWorkspace } = account;
        res.json({
            error: false,
            account: { _id, name, email, lastUsedWorkspace }
        } as IGetAccountDetailsResponse);
        return;
    },

    updateAccountDetails: (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        const account = req.user as IAccountModel;
        logger.log(Level.Verbose, UPDATING_ACCOUNT_DETAILS(account._id));
        const { name } = req.body as IUpdateAccountDetailsRequest;
        if (typeof name !== undefined) {
            account.name = name as string;
        }
        account.save((err, account) => {
            if (err) {
                return next(err);
            }
            const { _id, name, email, lastUsedWorkspace } = account;
            return res.json({
                error: false,
                account: { _id, name, email, lastUsedWorkspace }
            } as IUpdateAccountDetailsResponse);
        });
    },

    updateEmail: (req: Request, res: Response, next: NextFunction): void => {
        const account = req.user as IAccountModel;
        logger.log(Level.Verbose, UPDATING_EMAIL(account._id));
        const { password, newEmail } = req.body as IUpdateEmailRequest;
        account.comparePassword(password, (err, same) => {
            if (err) {
                return next(err);
            }
            if (!same) {
                return next(errorsConfig.passwordInvalid);
            }

            Account.findOne(
                { email: newEmail },
                (err, accountWithSameEmail) => {
                    if (err) {
                        return next(err);
                    }
                    if (accountWithSameEmail) {
                        return next(errorsConfig.emailAlreadyUsed);
                    }

                    account.email = newEmail;
                    account.save((err, account) => {
                        if (err) {
                            return next(err);
                        }
                        let jwtTokens: {
                            requestToken: string;
                            refreshToken?: string;
                            restoreToken?: string;
                        };
                        if (req.cookies['restore']) {
                            jwtTokens = account.generateJwtTokens(3);
                            res.cookie(
                                jwtConfig.Restore.DOMAIN,
                                jwtTokens.restoreToken,
                                {
                                    httpOnly: true,
                                    maxAge: jwtConfig.Restore.EXPIRATION
                                }
                            );
                        } else {
                            jwtTokens = account.generateJwtTokens(2);
                        }
                        res.cookie(
                            jwtConfig.Request.DOMAIN,
                            jwtTokens.requestToken,
                            {
                                httpOnly: true
                            }
                        );
                        res.cookie(
                            jwtConfig.Refresh.DOMAIN,
                            jwtTokens.refreshToken,
                            {
                                httpOnly: true
                            }
                        );
                        const { _id, name, email, lastUsedWorkspace } = account;
                        return res.json({
                            error: false,
                            account: { _id, name, email, lastUsedWorkspace }
                        } as IUpdateEmailResponse);
                    });
                }
            );
        });
    },

    changePassword: (req: Request, res: Response, next: NextFunction): void => {
        const account = req.user as IAccountModel;
        logger.log(Level.Verbose, UPDATING_PASSWORD(account._id));
        const { password, newPassword } = req.body as IChangePasswordRequest;
        account.comparePassword(password, (err, same) => {
            if (err) {
                return next(err);
            }
            if (!same) {
                return next(errorsConfig.passwordInvalid);
            }
            account.password = newPassword;
            account.save((err, account) => {
                if (err) {
                    return next(err);
                }
                let jwtTokens: {
                    requestToken: string;
                    refreshToken?: string;
                    restoreToken?: string;
                };
                if (req.cookies['restore']) {
                    jwtTokens = account.generateJwtTokens(3);
                    res.cookie(
                        jwtConfig.Restore.DOMAIN,
                        jwtTokens.restoreToken,
                        {
                            httpOnly: true,
                            maxAge: jwtConfig.Restore.EXPIRATION
                        }
                    );
                } else {
                    jwtTokens = account.generateJwtTokens(2);
                }
                res.cookie(jwtConfig.Request.DOMAIN, jwtTokens.requestToken, {
                    httpOnly: true
                });
                res.cookie(jwtConfig.Refresh.DOMAIN, jwtTokens.refreshToken, {
                    httpOnly: true
                });
                const { _id, name, email, lastUsedWorkspace } = account;
                return res.json({
                    error: false,
                    account: { _id, name, email, lastUsedWorkspace }
                } as IChangePasswordResponse);
            });
        });
    },

    deleteAccount: (req: Request, res: Response, next: NextFunction): void => {
        const account = req.user as IAccountModel;
        logger.log(Level.Verbose, DELETING_ACCOUNT(account._id));
        const { password } = req.body as IDeleteAccountRequest;
        account.comparePassword(password, (err, same) => {
            if (err) {
                return next(err);
            }
            if (!same) {
                return next(errorsConfig.passwordInvalid);
            }
            Account.findByIdAndDelete(account._id, (err, account) => {
                if (err) {
                    return next(err);
                }
                if (!account) {
                    return next(errorsConfig.accountNotFound);
                }
                Workspace.deleteMany({ account: account._id }, err => {
                    if (err) {
                        return next(err);
                    }
                    res.clearCookie(jwtConfig.Request.DOMAIN);
                    res.clearCookie(jwtConfig.Refresh.DOMAIN);
                    res.clearCookie(jwtConfig.Restore.DOMAIN);
                    const { _id, name, email, lastUsedWorkspace } = account;
                    return res.json({
                        error: false,
                        account: { _id, name, email, lastUsedWorkspace }
                    } as IDeleteAccountResponse);
                });
            });
        });
    },

    refreshToken: (req: Request, res: Response, next: NextFunction): void => {
        const account = req.user as IAccountModel;
        logger.log(Level.Verbose, REFRESHING_JWTS(account._id));
        const jwtTokens = account.generateJwtTokens(1);
        res.cookie(jwtConfig.Request.DOMAIN, jwtTokens.requestToken, {
            httpOnly: true
        });
        const { _id, name, email, lastUsedWorkspace } = account;
        res.json({
            error: false,
            account: { _id, name, email, lastUsedWorkspace }
        } as IRefreshTokenResponse);
        return;
    },

    restoreTokens: (req: Request, res: Response, next: NextFunction): void => {
        const account = req.user as IAccountModel;
        logger.log(Level.Verbose, RESTORING_JWTS(account._id));
        const jwtTokens = account.generateJwtTokens(2);
        res.cookie(jwtConfig.Request.DOMAIN, jwtTokens.requestToken, {
            httpOnly: true
        });
        res.cookie(jwtConfig.Refresh.DOMAIN, jwtTokens.refreshToken, {
            httpOnly: true
        });
        const { _id, name, email, lastUsedWorkspace } = account;
        res.json({
            error: false,
            account: { _id, name, email, lastUsedWorkspace }
        } as IRestoreTokensResponse);
        return;
    },

    signUp: (req: Request, res: Response, next: NextFunction): void => {
        const {
            name,
            email,
            password,
            rememberme
        } = req.body as ISignUpRequest;
        logger.log(Level.Verbose, SIGNING_UP(email));
        Account.create(
            { name, email, password },
            (err: any, account: IAccountModel) => {
                if (err) {
                    if (err.code === 11000) {
                        return next(errorsConfig.emailAlreadyUsed);
                    }
                    return next(err);
                }

                Workspace.create(
                    { account: account._id, name: `${name}'s Workspace` },
                    (err: any, workspace: IWorkspaceModel) => {
                        if (err) {
                            return next(err);
                        }

                        account.lastUsedWorkspace = workspace._id;
                        account.save((err, account) => {
                            if (err) {
                                return next(err);
                            }
                            const jwtTokens = rememberme
                                ? account.generateJwtTokens(3)
                                : account.generateJwtTokens(2);
                            res.cookie(
                                jwtConfig.Request.DOMAIN,
                                jwtTokens.requestToken,
                                {
                                    httpOnly: true
                                }
                            );
                            res.cookie(
                                jwtConfig.Refresh.DOMAIN,
                                jwtTokens.refreshToken,
                                {
                                    httpOnly: true
                                }
                            );
                            if (rememberme) {
                                res.cookie(
                                    jwtConfig.Restore.DOMAIN,
                                    jwtTokens.restoreToken,
                                    {
                                        httpOnly: true,
                                        maxAge: jwtConfig.Restore.EXPIRATION
                                    }
                                );
                            }
                            const {
                                _id,
                                name,
                                email,
                                lastUsedWorkspace
                            } = account;
                            return res.json({
                                error: false,
                                account: {
                                    _id,
                                    name,
                                    email,
                                    lastUsedWorkspace
                                }
                            } as ISignUpResponse);
                        });
                    }
                );
            }
        );
    },

    signIn: (req: Request, res: Response, next: NextFunction): void => {
        const { email, password, rememberme } = req.body as ISignInRequest;
        logger.log(Level.Verbose, SIGNING_IN(email));
        Account.findOne({ email }, (err, account) => {
            if (err) {
                return next(err);
            }
            if (!account) {
                return next(errorsConfig.accountNotFound);
            }
            account.comparePassword(password, (err, same) => {
                if (err) {
                    return next(err);
                }
                if (!same) {
                    return next(errorsConfig.passwordInvalid);
                }
                const jwtTokens = rememberme
                    ? account.generateJwtTokens(3)
                    : account.generateJwtTokens(2);
                res.cookie(jwtConfig.Request.DOMAIN, jwtTokens.requestToken, {
                    httpOnly: true
                });
                res.cookie(jwtConfig.Refresh.DOMAIN, jwtTokens.refreshToken, {
                    httpOnly: true
                });
                if (rememberme) {
                    res.cookie(
                        jwtConfig.Restore.DOMAIN,
                        jwtTokens.restoreToken,
                        {
                            httpOnly: true,
                            maxAge: jwtConfig.Restore.EXPIRATION
                        }
                    );
                }
                const { _id, name, email, lastUsedWorkspace } = account;
                return res.json({
                    error: false,
                    account: { _id, name, email, lastUsedWorkspace }
                } as ISignInResponse);
            });
        });
    },

    signOut: (req: Request, res: Response, next: NextFunction): void => {
        logger.log(Level.Verbose, SIGNING_OUT(req.ip));
        res.clearCookie(jwtConfig.Request.DOMAIN);
        res.clearCookie(jwtConfig.Refresh.DOMAIN);
        res.clearCookie(jwtConfig.Restore.DOMAIN);
        res.json({ error: false, message: SIGNED_OUT } as ISignOutResponse);
        return;
    },

    forgotPassword: (req: Request, res: Response, next: NextFunction): void => {
        const { email } = req.body as IForgotPasswordRequest;
        logger.log(Level.Verbose, SENDING_RESET_EMAIL(email));
        Account.findOne({ email }, (err, account) => {
            if (err) {
                return next(err);
            }
            if (!account) {
                return next(errorsConfig.accountNotFound);
            }
            crypto.randomBytes(resetTokenLength, (err, buffer) => {
                if (err) {
                    return next(err);
                }
                const token = buffer.toString('hex');
                account.resetToken = token;
                account.resetTokenExpiration =
                    Date.now() + resetTokenExpiration;
                account.save();
                transporter.sendMail(
                    resetPasswordEmailOptions(email, token, account._id),
                    (err, response) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(response);
                        return res.json({
                            error: false,
                            message: RESET_PASSWORD_EMAIL_SENT
                        } as IForgotPasswordResponse);
                    }
                );
            });
        });
    },

    resetPassword: (req: Request, res: Response, next: NextFunction): void => {
        const { _id, token, password } = req.body as IResetPasswordRequest;
        logger.log(Level.Verbose, RESETTING_PASSWORD(_id, req.ip));
        if (!isValidObjectId(_id)) {
            return next(errorsConfig.resetTokenInvalid);
        }
        Account.findOne({ _id }, (err, account) => {
            if (err) {
                return next(err);
            }
            if (!account) {
                return next(errorsConfig.accountNotFound);
            }
            if (!account.resetToken) {
                return next(errorsConfig.resetNotAllowed);
            }
            if (account.resetToken !== token) {
                return next(errorsConfig.resetTokenInvalid);
            }
            if (
                account.resetTokenExpiration &&
                account.resetTokenExpiration <= Date.now()
            ) {
                return next(errorsConfig.resetTokenExpired);
            }
            if (password) {
                account.password = password;
                account.resetToken = undefined;
                account.resetTokenExpiration = undefined;
                account.save();
                return res.json({
                    error: false,
                    isTokenCheck: false,
                    message: RESETTED_PASSWORD
                } as IResetPasswordResponse);
            }
            return res.json({
                error: false,
                isTokenCheck: true,
                message: CHECKED_RESET_TOKEN
            } as IResetPasswordResponse);
        });
    }
};
