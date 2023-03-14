/**
 * ChangePasswordModal/index.tsx
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { isChangePasswordModalOpenedSelector } from '../../../selectors/account.selectors';
import { closeChangePasswordModal } from '../../../slices/account.slice';
import { changePasswordThunk } from '../../../thunks/account.thunks';
import {
    ErrorType,
    IErrorResponse
} from '../../../types/protocols/error.protocols';
import View from './view';

const ChangePasswordModal = (): JSX.Element => {
    const dispatch = useDispatch();

    const isChangePasswordModalOpened = useSelector(
        isChangePasswordModalOpenedSelector
    );

    const [state, setState] = useState({
        error: '',
        disabled: false,
        newPassword: '',
        confirmNewPassword: '',
        currentPassword: ''
    });

    const getButtonStatus = (): boolean => {
        if (
            validator.isEmpty(state.newPassword) ||
            validator.isEmpty(state.confirmNewPassword) ||
            validator.isEmpty(state.currentPassword) ||
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
            error: '',
            confirmNewPassword: newValue
        }));
    };

    const handleCurrentPasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const newValue = event.target.value;
        setState(previousState => ({
            ...previousState,
            error: '',
            currentPassword: newValue
        }));
    };

    const handleChangePassword = async (): Promise<void> => {
        setState(previousState => ({
            ...previousState,
            disabled: true
        }));
        const response = await dispatch(
            changePasswordThunk({
                password: state.currentPassword,
                newPassword: state.newPassword
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

    const handleChangePasswordModalClose = (): void => {
        dispatch(closeChangePasswordModal());
    };

    return (
        <View
            isModalOpened={isChangePasswordModalOpened}
            disabled={getButtonStatus()}
            error={state.error}
            newPassword={state.newPassword}
            confirmNewPassword={state.confirmNewPassword}
            currentPassword={state.currentPassword}
            onNewPasswordChange={handleNewPasswordChange}
            onConfirmNewPasswordChange={handleConfirmNewPasswordChange}
            onCurrentPasswordChange={handleCurrentPasswordChange}
            onFormSubmit={handleChangePassword}
            onModalClose={handleChangePasswordModalClose}
        />
    );
};

export default ChangePasswordModal;
