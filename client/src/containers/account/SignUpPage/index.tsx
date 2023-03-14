/**
 * SignUpPage/index.tsx
 */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import { signUpThunk } from '../../../thunks/account.thunks';
import {
    ErrorType,
    IErrorResponse
} from '../../../types/protocols/error.protocols';
import View from './view';

const SignUpPage = (): JSX.Element => {
    const dispatch = useDispatch();

    const [state, setState] = useState({
        error: '',
        disabled: false,
        name: '',
        email: '',
        password: '',
        rememberMe: true
    });

    const getButtonStatus = (): boolean => {
        if (
            validator.isEmpty(state.name, {
                ignore_whitespace: true
            }) ||
            validator.isEmpty(state.email, {
                ignore_whitespace: true
            }) ||
            validator.isEmpty(state.password) ||
            !validator.isEmail(state.email) ||
            !validator.isLength(state.password, { min: 8 }) ||
            state.disabled
        ) {
            return true;
        }
        return false;
    };

    const handleNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const newValue = event.target.value;
        setState(previousState => ({
            ...previousState,
            error: '',
            name: newValue
        }));
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

    const handleSignUp = async (): Promise<void> => {
        setState(previousState => ({
            ...previousState,
            disabled: true
        }));
        const response = await dispatch(
            signUpThunk({
                name: state.name,
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
            name={state.name}
            email={state.email}
            password={state.password}
            rememberMe={state.rememberMe}
            onNameChange={handleNameChange}
            onEmailChange={handleEmailChange}
            onPasswordChange={handlePasswordChange}
            onRememberMeToggle={handleRememberMeToggle}
            onFormSubmit={handleSignUp}
        />
    );
};

export default SignUpPage;
