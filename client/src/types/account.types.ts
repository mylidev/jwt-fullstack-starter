/**
 * account.types.ts
 */

export interface IAccount {
    _id: string;
    name: string;
    email: string;
    resetToken?: string;
    resetTokenExpiration?: number;
    lastUsedWorkspace: string;
}

export interface IAccountState {
    account: undefined | boolean | IAccount;
    isForgotPasswordFormSubmitted: boolean;
    isResetPasswordTokenVerified: undefined | boolean;
    isResetPasswordFormSubmitted: boolean;
    isUpdateEmailModalOpened: boolean;
    isChangePasswordModalOpened: boolean;
    isDeleteAccountModalOpened: boolean;
    isDeleteAccountAlertOpened: boolean;
}
