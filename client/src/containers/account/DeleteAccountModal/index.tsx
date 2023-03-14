/**
 * DeleteAccountModal/index.tsx
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import {
    isDeleteAccountAlertOpenedSelector,
    isDeleteAccountModalOpenedSelector
} from '../../../selectors/account.selectors';
import {
    closeDeleteAccountAlert,
    closeDeleteAccountModal,
    openDeleteAccountAlert
} from '../../../slices/account.slice';
import { closeSettingsModal } from '../../../slices/system.slice';
import { deleteAccountThunk } from '../../../thunks/account.thunks';
import { IDeleteAccountResponse } from '../../../types/protocols/account.protocols';
import {
    ErrorType,
    IErrorResponse
} from '../../../types/protocols/error.protocols';
import View from './view';

const DeleteAccountModal = (): JSX.Element => {
    const dispatch = useDispatch();

    const isDeleteAccountModalOpened = useSelector(
        isDeleteAccountModalOpenedSelector
    );
    const isDeleteAccountAlertOpened = useSelector(
        isDeleteAccountAlertOpenedSelector
    );

    const [state, setState] = useState({
        error: '',
        disabled: false,
        password: ''
    });

    const getButtonStatus = (): boolean => {
        if (validator.isEmpty(state.password) || state.disabled) {
            return true;
        }
        return false;
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

    const handleDeleteAccountAlertOpen = (): void => {
        setState(previousState => ({
            ...previousState,
            disabled: true
        }));
        dispatch(openDeleteAccountAlert());
    };

    const handleDeleteAccountModalClose = (): void => {
        dispatch(closeDeleteAccountModal());
    };

    const handleDeleteAccount = async (): Promise<void> => {
        dispatch(closeDeleteAccountAlert());

        const response = await dispatch(
            deleteAccountThunk({
                password: state.password
            }) as any
        );
        setState(previousState => ({
            ...previousState,
            disabled: false
        }));
        const payload = response.payload as
            | IDeleteAccountResponse
            | IErrorResponse;
        if (
            payload.error &&
            (payload as IErrorResponse).type === ErrorType.Persistent
        ) {
            setState(previousState => ({
                ...previousState,
                error: (payload as IErrorResponse).message
            }));
        }
        if (!payload.error) {
            dispatch(closeDeleteAccountModal());
            dispatch(closeSettingsModal());
        }
    };

    const handleDeleteAccountAlertClose = (): void => {
        dispatch(closeDeleteAccountAlert());
        setState(previousState => ({
            ...previousState,
            disabled: false
        }));
    };

    return (
        <View
            isModalOpened={isDeleteAccountModalOpened}
            isAlertOpened={isDeleteAccountAlertOpened}
            disabled={getButtonStatus()}
            error={state.error}
            password={state.password}
            onPasswordChange={handlePasswordChange}
            onFormSubmit={handleDeleteAccountAlertOpen}
            onModalClose={handleDeleteAccountModalClose}
            onAlertConfirm={handleDeleteAccount}
            onAlertCancel={handleDeleteAccountAlertClose}
        />
    );
};

export default DeleteAccountModal;
