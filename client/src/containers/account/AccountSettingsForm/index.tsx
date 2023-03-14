/**
 * AccountSettingsForm/index.tsx
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { accountSelector } from '../../../selectors/account.selectors';
import {
    openChangePasswordModal,
    openDeleteAccountModal,
    openUpdateEmailModal
} from '../../../slices/account.slice';
import { updateAccountDetailsThunk } from '../../../thunks/account.thunks';
import { IAccount } from '../../../types/account.types';
import { IUpdateAccountDetailsResponse } from '../../../types/protocols/account.protocols';
import View from './view';

const AccountSettingsForm = (): JSX.Element => {
    const dispatch = useDispatch();

    const account = useSelector(accountSelector) as IAccount;

    const [state, setState] = useState({
        disabled: false,
        name: account.name,
        initial: {
            name: account.name
        }
    });

    const getButtonStatus = (): boolean => {
        const value = state.name;
        const initialValue = state.initial.name;
        if (
            !value ||
            validator.isEmpty(value, { ignore_whitespace: true }) ||
            value === initialValue ||
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
            name: newValue
        }));
    };

    const handleUpdateAccountDetails = async (): Promise<void> => {
        setState(previousState => ({
            ...previousState,
            disabled: true
        }));
        const response = await dispatch(
            updateAccountDetailsThunk({ name: state.name }) as any
        );
        setState(previousState => ({
            ...previousState,
            disabled: false
        }));
        const payload = response.payload as IUpdateAccountDetailsResponse;
        if (!payload.error) {
            setState(previousState => ({
                ...previousState,
                initial: {
                    name: payload.account.name
                }
            }));
        }
    };

    const handleUpdateEmailModalOpen = (): void => {
        dispatch(openUpdateEmailModal());
    };

    const handleChangePasswordModalOpen = (): void => {
        dispatch(openChangePasswordModal());
    };

    const handleDeleteAccountModalOpen = (): void => {
        dispatch(openDeleteAccountModal());
    };

    return (
        <View
            disabled={getButtonStatus()}
            name={state.name}
            namePlaceholder={state.initial.name}
            email={account.email}
            onNameChange={handleNameChange}
            onFormSubmit={handleUpdateAccountDetails}
            onUpdateEmailButtonClick={handleUpdateEmailModalOpen}
            onChangePasswordButtonClick={handleChangePasswordModalOpen}
            onDeleteAccountButtonClick={handleDeleteAccountModalOpen}
        />
    );
};

export default AccountSettingsForm;
