/**
 * error.protocols.ts
 */

export enum ErrorStatus {
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    Conflict = 409,
    InvalidJwt = 499,
    Internal = 500
}

export enum ErrorType {
    Hidden = 'hidden',
    Ephemeral = 'ephemeral',
    Persistent = 'persistent'
}

export interface IError {
    status: ErrorStatus;
    type: ErrorType;
    message: string;
}

export interface IErrorList {
    [key: string]: IError;
}

export interface IErrorResponse {
    error: boolean;
    type: ErrorType;
    message: string;
}

export const isError = (object: any): object is IError => {
    return 'message' in object;
};
