/**
 * account.slice.ts
 */

import { createSlice } from '@reduxjs/toolkit';
import {
    changePasswordThunk,
    deleteAccountThunk,
    getAccountDetailsThunk,
    resetPasswordThunk,
    signInThunk,
    signOutThunk,
    signUpThunk,
    updateAccountDetailsThunk,
    updateEmailThunk,
    forgotPasswordThunk
} from '../thunks/account.thunks';
import { IAccountState } from '../types/account.types';

const accountSlice = createSlice({
    name: 'account',
    initialState: {
        account: undefined,
        isForgotPasswordFormSubmitted: false,
        isResetPasswordTokenVerified: undefined,
        isResetPasswordFormSubmitted: false,
        isUpdateEmailModalOpened: false,
        isChangePasswordModalOpened: false,
        isDeleteAccountModalOpened: false,
        isDeleteAccountAlertOpened: false
    } as IAccountState,
    reducers: {
        updateJwtsFailure: (state): void => {
            state.account = false;
        },
        openUpdateEmailModal: (state): void => {
            state.isUpdateEmailModalOpened = true;
        },
        closeUpdateEmailModal: (state): void => {
            state.isUpdateEmailModalOpened = false;
        },
        openChangePasswordModal: (state): void => {
            state.isChangePasswordModalOpened = true;
        },
        closeChangePasswordModal: (state): void => {
            state.isChangePasswordModalOpened = false;
        },
        openDeleteAccountModal: (state): void => {
            state.isDeleteAccountModalOpened = true;
        },
        closeDeleteAccountModal: (state): void => {
            state.isDeleteAccountModalOpened = false;
        },
        openDeleteAccountAlert: (state): void => {
            state.isDeleteAccountAlertOpened = true;
        },
        closeDeleteAccountAlert: (state): void => {
            state.isDeleteAccountAlertOpened = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(
            getAccountDetailsThunk.fulfilled,
            (state, { payload }) => {
                state.account = payload.account;
            }
        );

        builder.addCase(
            updateAccountDetailsThunk.fulfilled,
            (state, { payload }) => {
                state.account = payload.account;
            }
        );

        builder.addCase(updateEmailThunk.fulfilled, (state, { payload }) => {
            state.account = payload.account;
        });

        builder.addCase(changePasswordThunk.fulfilled, (state, { payload }) => {
            state.account = payload.account;
        });

        builder.addCase(deleteAccountThunk.fulfilled, state => {
            state.account = false;
        });

        builder.addCase(signUpThunk.fulfilled, (state, { payload }) => {
            state.account = payload.account;
        });

        builder.addCase(signInThunk.fulfilled, (state, { payload }) => {
            state.account = payload.account;
        });

        builder.addCase(signOutThunk.fulfilled, state => {
            state.account = false;
        });

        builder.addCase(forgotPasswordThunk.fulfilled, state => {
            state.isForgotPasswordFormSubmitted = true;
        });

        builder.addCase(resetPasswordThunk.fulfilled, (state, { payload }) => {
            if (payload.isTokenCheck) {
                state.isResetPasswordTokenVerified = true;
            } else {
                state.isResetPasswordFormSubmitted = true;
            }
        });

        builder.addCase(resetPasswordThunk.rejected, state => {
            if (state.isResetPasswordTokenVerified === undefined) {
                state.isResetPasswordTokenVerified = false;
            }
        });
    }
});

export const {
    updateJwtsFailure,
    openUpdateEmailModal,
    closeUpdateEmailModal,
    openChangePasswordModal,
    closeChangePasswordModal,
    openDeleteAccountModal,
    closeDeleteAccountModal,
    openDeleteAccountAlert,
    closeDeleteAccountAlert
} = accountSlice.actions;
export default accountSlice.reducer;
