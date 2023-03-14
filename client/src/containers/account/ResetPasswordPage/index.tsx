/**
 * ResetPasswordPage/index.tsx
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import validator from 'validator';
import {
    isResetPasswordFormSubmittedSelector,
    isResetPasswordTokenVerifiedSelector
} from '../../../selectors/account.selectors';
import { resetPasswordThunk } from '../../../thunks/account.thunks';
import {
    ErrorType,
    IErrorResponse
} from '../../../types/protocols/error.protocols';
import View from './view';

const ResetPasswordPage = (): JSX.Element => {
    const dispatch = useDispatch();

    const isResetPasswordTokenVerified = useSelector(
        isResetPasswordTokenVerifiedSelector
    );
    const isResetPasswordFormSubmitted = useSelector(
        isResetPasswordFormSubmittedSelector
    );

    const { _id, token }: { _id: string; token: string } = useParams();

    const [state, setState] = useState({
        error: '',
        disabled: false,
        newPassword: '',
        confirmNewPassword: ''
    });

    useEffect(() => {
        const asyncEffect = async (): Promise<void> => {
            const response = await dispatch(
                resetPasswordThunk({
                    _id,
                    token
                }) as any
            );
            const payload = response.payload as IErrorResponse;
            if (payload.error && payload.type === ErrorType.Persistent) {
                setState(previousState => ({
                    ...previousState,
                    error: payload.message
                }));
            }
        };
        void asyncEffect();
        // eslint-disable-next-line
    }, []);

    const getButtonStatus = (): boolean => {
        if (
            validator.isEmpty(state.newPassword) ||
            validator.isEmpty(state.confirmNewPassword) ||
            !validator.isLength(state.newPassword, { min: 8 }) ||
            state.newPassword !== state.confirmNewPassword ||
            state.disabled
        ) {
            return true;
        }
        return false;
    };

    const handleNewPasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const newValue = event.target.value;
        setState(previousState => ({
            ...previousState,
            error: '',
            newPassword: newValue
        }));
    };

    const handleConfirmNewPasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const newValue = event.target.value;
        setState(previousState => ({
            ...previousState,
            verified: false,
            submitted: false,
            error: '',
            confirmNewPassword: newValue
        }));
    };

    const handleResetPassword = async (): Promise<void> => {
        setState(previousState => ({
            ...previousState,
            disabled: true
        }));
        const response = await dispatch(
            resetPasswordThunk({
                _id,
                token,
                password: state.newPassword
            }) as any
        );
        setState(previousState => ({
            ...previousState,
            disabled: false
        }));
        const payload = response.payload as IErrorResponse;
        if (payload.error && payload.type === ErrorType.Persistent) {
            setState(previousState => ({
                ...previousState,
                error: payload.message
            }));
        }
    };

    return (
        <View
            verified={isResetPasswordTokenVerified}
            submitted={isResetPasswordFormSubmitted}
            disabled={getButtonStatus()}
            error={state.error}
            newPassword={state.newPassword}
            confirmNewPassword={state.confirmNewPassword}
            onNewPasswordChange={handleNewPasswordChange}
            onConfirmNewPasswordChange={handleConfirmNewPasswordChange}
            onFormSubmit={handleResetPassword}
        />
    );
};

export default ResetPasswordPage;
