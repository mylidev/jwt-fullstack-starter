/**
 * ForgotPasswordPage/index.tsx
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { forgotPasswordThunk } from '../../../thunks/account.thunks';
import {
    ErrorType,
    IErrorResponse
} from '../../../types/protocols/error.protocols';
import View from './view';
import { isForgotPasswordFormSubmittedSelector } from '../../../selectors/account.selectors';

const ForgotPasswordPage = (): JSX.Element => {
    const dispatch = useDispatch();

    const isForgotPasswordFormSubmitted = useSelector(
        isForgotPasswordFormSubmittedSelector
    );

    const [state, setState] = useState({
        error: '',
        disabled: false,
        email: '',
        password: ''
    });

    const getButtonStatus = (): boolean => {
        if (
            validator.isEmpty(state.email, {
                ignore_whitespace: true
            }) ||
            state.disabled
        ) {
            return true;
        }
        return false;
    };

    const handleEmailChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const newValue = event.target.value;
        setState(previousState => ({
            ...previousState,
            error: '',
            email: newValue
        }));
    };

    const handleForgotPassword = async (): Promise<void> => {
        setState(previousState => ({
            ...previousState,
            disabled: true
        }));
        const response = await dispatch(
            forgotPasswordThunk({
                email: state.email
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
            submitted={isForgotPasswordFormSubmitted}
            disabled={getButtonStatus()}
            error={state.error}
            email={state.email}
            onEmailChange={handleEmailChange}
            onFormSubmit={handleForgotPassword}
        />
    );
};

export default ForgotPasswordPage;
