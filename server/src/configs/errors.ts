/**
 * errors.ts
 */

import {
    ErrorStatus,
    ErrorType,
    IErrorList
} from '../types/protocols/error.protocols';

export default {
    uncaughtError: {
        status: ErrorStatus.Internal,
        type: ErrorType.Hidden,
        message: 'An error occurred.'
    },
    requestInvalid: {
        status: ErrorStatus.BadRequest,
        type: ErrorType.Hidden,
        message: 'Request content failed validation checks.'
    },
    jwtInvalid: {
        status: ErrorStatus.InvalidJwt,
        type: ErrorType.Hidden,
        message: 'Failed to authorize JWTs!'
    },
    emailAlreadyUsed: {
        status: ErrorStatus.Conflict,
        type: ErrorType.Persistent,
        message: 'E-mail is already in use!'
    },
    accountNotFound: {
        status: ErrorStatus.NotFound,
        type: ErrorType.Persistent,
        message: 'Account does not exist!'
    },
    passwordInvalid: {
        status: ErrorStatus.Unauthorized,
        type: ErrorType.Persistent,
        message: 'Password is incorrect!'
    },
    resetNotAllowed: {
        status: ErrorStatus.Unauthorized,
        type: ErrorType.Persistent,
        message: 'You are not allowed to reset the password of this account!'
    },
    resetTokenInvalid: {
        status: ErrorStatus.Unauthorized,
        type: ErrorType.Persistent,
        message:
            'Reset password link is invalid! Request for another at {~/forgot}'
    },
    resetTokenExpired: {
        status: ErrorStatus.Unauthorized,
        type: ErrorType.Persistent,
        message:
            'Reset password link has expired! Request for another at {~/forgot}'
    },
    workspaceNotFound: {
        status: ErrorStatus.NotFound,
        type: ErrorType.Ephemeral,
        message: 'Failed to find workspace.'
    },
    deleteNotAllowed: {
        status: ErrorStatus.BadRequest,
        type: ErrorType.Ephemeral,
        message: 'You cannot delete the last workspace!'
    }
} as IErrorList;
