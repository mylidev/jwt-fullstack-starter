/**
 * account.protocols.ts
 */

/* REQUESTS */

export interface IUpdateAccountDetailsRequest {
    name?: string;
}

export interface IUpdateEmailRequest {
    password: string;
    newEmail: string;
}

export interface IChangePasswordRequest {
    password: string;
    newPassword: string;
}

export interface IDeleteAccountRequest {
    password: string;
}

export interface ISignUpRequest {
    name: string;
    email: string;
    password: string;
    rememberme: boolean;
}

export interface ISignInRequest {
    email: string;
    password: string;
    rememberme: boolean;
}

export interface IForgotPasswordRequest {
    email: string;
}

export interface IResetPasswordRequest {
    _id: string;
    token: string;
    password?: string;
}

/* RESPONSES */

export interface IGetAccountDetailsResponse {
    error: boolean;
    account: {
        _id: string;
        name: string;
        email: string;
        lastUsedWorkspace: string;
    };
}

export interface IUpdateAccountDetailsResponse {
    error: boolean;
    account: {
        _id: string;
        name: string;
        email: string;
        lastUsedWorkspace: string;
    };
}

export interface IUpdateEmailResponse {
    error: boolean;
    account: {
        _id: string;
        name: string;
        email: string;
        lastUsedWorkspace: string;
    };
}

export interface IChangePasswordResponse {
    error: boolean;
    account: {
        _id: string;
        name: string;
        email: string;
        lastUsedWorkspace: string;
    };
}

export interface IDeleteAccountResponse {
    error: boolean;
    account: {
        _id: string;
        name: string;
        email: string;
        lastUsedWorkspace: string;
    };
}

export interface IRefreshTokenResponse {
    error: boolean;
    account: {
        _id: string;
        name: string;
        email: string;
        lastUsedWorkspace: string;
    };
}

export interface IRestoreTokensResponse {
    error: boolean;
    account: {
        _id: string;
        name: string;
        email: string;
        lastUsedWorkspace: string;
    };
}

export interface ISignUpResponse {
    error: boolean;
    account: {
        _id: string;
        name: string;
        email: string;
        lastUsedWorkspace: string;
    };
}

export interface ISignInResponse {
    error: boolean;
    account: {
        _id: string;
        name: string;
        email: string;
        lastUsedWorkspace: string;
    };
}

export interface ISignOutResponse {
    error: boolean;
    message: string;
}

export interface IForgotPasswordResponse {
    error: boolean;
    message: string;
}

export interface IResetPasswordResponse {
    error: boolean;
    isTokenCheck: boolean;
    message: string;
}
