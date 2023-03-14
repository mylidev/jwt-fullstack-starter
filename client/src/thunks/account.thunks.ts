/**
 * account.thunks.ts
 */

import { Intent } from '@blueprintjs/core';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    IChangePasswordRequest,
    IChangePasswordResponse,
    IDeleteAccountRequest,
    IDeleteAccountResponse,
    IForgotPasswordRequest,
    IForgotPasswordResponse,
    IGetAccountDetailsResponse,
    IResetPasswordRequest,
    IResetPasswordResponse,
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
import { IThunkAPI } from '../types/thunks.types';
import api, { publicClient } from '../utils/api';
import handleThunkError from '../utils/error';
import toast from '../utils/toast';

const accountPath = '/account';

export const getAccountDetailsThunk = createAsyncThunk<
    IGetAccountDetailsResponse,
    undefined,
    IThunkAPI
>('account/getAccountDetails', async (data, thunkAPI) => {
    try {
        const response = await api.get<IGetAccountDetailsResponse>(
            `${accountPath}/`
        );
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err));
    }
});

export const updateAccountDetailsThunk = createAsyncThunk<
    IUpdateAccountDetailsResponse,
    IUpdateAccountDetailsRequest,
    IThunkAPI
>('account/updateAccountDetails', async (data, thunkAPI) => {
    try {
        const response = await api.post<IUpdateAccountDetailsResponse>(
            `${accountPath}/`,
            data
        );
        toast('tick', Intent.SUCCESS, 'Successfully changed details.');
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err));
    }
});

export const updateEmailThunk = createAsyncThunk<
    IUpdateEmailResponse,
    IUpdateEmailRequest,
    IThunkAPI
>('account/updateEmail', async (data, thunkAPI) => {
    try {
        const response = await api.post<IUpdateEmailResponse>(
            `${accountPath}/email`,
            data
        );
        toast('tick', Intent.SUCCESS, 'Successfully changed E-Mail.');
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err));
    }
});

export const changePasswordThunk = createAsyncThunk<
    IChangePasswordResponse,
    IChangePasswordRequest,
    IThunkAPI
>('account/changePassword', async (data, thunkAPI) => {
    try {
        const response = await api.post<IChangePasswordResponse>(
            `${accountPath}/password`,
            data
        );
        toast('tick', Intent.SUCCESS, 'Successfully changed password.');
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err));
    }
});

export const deleteAccountThunk = createAsyncThunk<
    IDeleteAccountResponse,
    IDeleteAccountRequest,
    IThunkAPI
>('account/deleteAccount', async (data, thunkAPI) => {
    try {
        const response = await api.delete<IDeleteAccountResponse>(
            `${accountPath}/`,
            { data }
        );
        toast('tick', Intent.SUCCESS, 'Account successfully deleted.');
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err));
    }
});

export const signUpThunk = createAsyncThunk<
    ISignUpResponse,
    ISignUpRequest,
    IThunkAPI
>('account/signUp', async (data, thunkAPI) => {
    try {
        const response = await publicClient.post<ISignUpResponse>(
            `${accountPath}/signup`,
            data
        );
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err));
    }
});

export const signInThunk = createAsyncThunk<
    ISignInResponse,
    ISignInRequest,
    IThunkAPI
>('account/signIn', async (data, thunkAPI) => {
    try {
        const response = await publicClient.post<ISignInResponse>(
            `${accountPath}/signin`,
            data
        );
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err));
    }
});

export const signOutThunk = createAsyncThunk<
    ISignOutResponse,
    undefined,
    IThunkAPI
>('account/signOut', async (data, thunkAPI) => {
    try {
        const response = await publicClient.get<ISignOutResponse>(
            `${accountPath}/signout`
        );
        toast('tick', Intent.SUCCESS, 'Successfully signed out.');
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err));
    }
});

export const forgotPasswordThunk = createAsyncThunk<
    IForgotPasswordResponse,
    IForgotPasswordRequest,
    IThunkAPI
>('account/forgotPassword', async (data, thunkAPI) => {
    try {
        const response = await publicClient.post<IForgotPasswordResponse>(
            `${accountPath}/forgot`,
            data
        );
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err));
    }
});

export const resetPasswordThunk = createAsyncThunk<
    IResetPasswordResponse,
    IResetPasswordRequest,
    IThunkAPI
>('account/resetPassword', async (data, thunkAPI) => {
    try {
        const response = await publicClient.post<IResetPasswordResponse>(
            `${accountPath}/reset`,
            data
        );
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err));
    }
});
