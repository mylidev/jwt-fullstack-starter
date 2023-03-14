/**
 * SettingsModal/index.tsx
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isSettingsModalOpenedSelector } from '../../../selectors/system.selectors';
import { closeSettingsModal } from '../../../slices/system.slice';
import { signOutThunk } from '../../../thunks/account.thunks';
import { IErrorResponse } from '../../../types/protocols/error.protocols';
import View from './view';

const SettingsModal = (): JSX.Element => {
    const dispatch = useDispatch();

    const isSettingsModalOpened = useSelector(isSettingsModalOpenedSelector);

    const [selected, setSelected] = useState(0);

    const handleSettingsModalClose = (): void => {
        dispatch(closeSettingsModal());
        setSelected(0);
    };

    const handleSettingsFormSelect = (index: number): void => {
        setSelected(index);
    };

    const handleSignOut = async (): Promise<void> => {
        const response = await dispatch(signOutThunk() as any);
        const payload = response.payload as IErrorResponse;
        if (!payload.error) {
            dispatch(closeSettingsModal());
        }
    };

    return (
        <View
            isModalOpened={isSettingsModalOpened}
            selected={selected}
            onSelect={handleSettingsFormSelect}
            onSignOutClick={handleSignOut}
            onModalClose={handleSettingsModalClose}
        />
    );
};

export default SettingsModal;
