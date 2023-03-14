/**
 * account.selectors.ts
 */

import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { IAccountState } from '../types/account.types';

const accountStateSelector = (state: AppState): IAccountState => state.account;

export const accountSelector = createSelector(
    accountStateSelector,
    account => account.account
);

export const accountStatusSelector = createSelector(
    accountStateSelector,
    accountState => {
        const account = accountState.account;
        if (account === undefined || account === false) {
            return account;
        }
        return true;
    }
);

export const isForgotPasswordFormSubmittedSelector = createSelector(
    accountStateSelector,
    accountState => accountState.isForgotPasswordFormSubmitted
);

export const isResetPasswordTokenVerifiedSelector = createSelector(
    accountStateSelector,
    accountState => accountState.isResetPasswordTokenVerified
);

export const isResetPasswordFormSubmittedSelector = createSelector(
    accountStateSelector,
    accountState => accountState.isResetPasswordFormSubmitted
);

export const isUpdateEmailModalOpenedSelector = createSelector(
    accountStateSelector,
    accountState => accountState.isUpdateEmailModalOpened
);

export const isChangePasswordModalOpenedSelector = createSelector(
    accountStateSelector,
    accountState => accountState.isChangePasswordModalOpened
);

export const isDeleteAccountModalOpenedSelector = createSelector(
    accountStateSelector,
    accountState => accountState.isDeleteAccountModalOpened
);

export const isDeleteAccountAlertOpenedSelector = createSelector(
    accountStateSelector,
    accountState => accountState.isDeleteAccountAlertOpened
);
