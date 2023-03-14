/**
 * SignInPage/index.tsx
 */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import { signInThunk } from '../../../thunks/account.thunks';
import {
    ErrorType,
    IErrorResponse
} from '../../../types/protocols/error.protocols';
import View from './view';

const SignInPage = (): JSX.Element => {
    const dispatch = useDispatch();

    const [state, setState] = useState({
        error: '',
        disabled: false,
        email: '',
        password: '',
        rememberMe: true
    });

    const getButtonStatus = (): boolean => {
        if (
            validator.isEmpty(state.email, {
                ignore_whitespace: true
            }) ||
            validator.isEmpty(state.password) ||
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

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const newValue = event.target.value;
        setState(previousState => ({
            ...previousState,
            error: '',
            password: newValue
        }));
    };

    const handleRememberMeToggle = (): void => {
        setState(previousState => ({
            ...previousState,
            rememberMe: !previousState.rememberMe
        }));
    };

    const handleSignIn = async (): Promise<void> => {
        setState(previousState => ({
            ...previousState,
            disabled: true
        }));
        const response = await dispatch(
            signInThunk({
                email: state.email,
                password: state.password,
                rememberme: state.rememberMe
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
            disabled={getButtonStatus()}
            error={state.error}
            email={state.email}
            password={state.password}
            rememberMe={state.rememberMe}
            onEmailChange={handleEmailChange}
            onPasswordChange={handlePasswordChange}
            onRememberMeToggle={handleRememberMeToggle}
            onFormSubmit={handleSignIn}
        />
    );
};

export default SignInPage;
