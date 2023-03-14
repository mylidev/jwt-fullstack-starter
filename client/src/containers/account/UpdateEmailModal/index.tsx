/**
 * UpdateEmailModal/index.tsx
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { isUpdateEmailModalOpenedSelector } from '../../../selectors/account.selectors';
import { closeUpdateEmailModal } from '../../../slices/account.slice';
import { updateEmailThunk } from '../../../thunks/account.thunks';
import {
    ErrorType,
    IErrorResponse
} from '../../../types/protocols/error.protocols';
import View from './view';

const UpdateEmailModal = (): JSX.Element => {
    const dispatch = useDispatch();

    const isUpdateEmailModalOpened = useSelector(
        isUpdateEmailModalOpenedSelector
    );

    const [state, setState] = useState({
        error: '',
        disabled: false,
        newEmail: '',
        confirmNewEmail: '',
        password: ''
    });

    const getButtonStatus = (): boolean => {
        if (
            validator.isEmpty(state.newEmail, {
                ignore_whitespace: true
            }) ||
            validator.isEmpty(state.confirmNewEmail, {
                ignore_whitespace: true
            }) ||
            validator.isEmpty(state.password) ||
            !validator.isEmail(state.newEmail) ||
            state.newEmail !== state.confirmNewEmail ||
            state.disabled
        ) {
            return true;
        }
        return false;
    };

    const handleNewEmailChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const newValue = event.target.value;
        setState(previousState => ({
            ...previousState,
            error: '',
            newEmail: newValue
        }));
    };

    const handleConfirmNewEmailChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const newValue = event.target.value;
        setState(previousState => ({
            ...previousState,
            error: '',
            confirmNewEmail: newValue
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

    const handleUpdateEmail = async (): Promise<void> => {
        setState(previousState => ({
            ...previousState,
            disabled: true
        }));
        const response = await dispatch(
            updateEmailThunk({
                password: state.password,
                newEmail: state.newEmail
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

    const handleUpdateEmailModalClose = (): void => {
        dispatch(closeUpdateEmailModal());
    };

    return (
        <View
            isModalOpened={isUpdateEmailModalOpened}
            disabled={getButtonStatus()}
            error={state.error}
            newEmail={state.newEmail}
            confirmEmail={state.confirmNewEmail}
            password={state.password}
            onNewEmailChange={handleNewEmailChange}
            onConfirmEmailChange={handleConfirmNewEmailChange}
            onPasswordChange={handlePasswordChange}
            onFormSubmit={handleUpdateEmail}
            onModalClose={handleUpdateEmailModalClose}
        />
    );
};

export default UpdateEmailModal;
