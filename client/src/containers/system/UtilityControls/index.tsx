/**
 * UtilityControls/index.tsx
 */

import React from 'react';
import View from './view';
import { useDispatch } from 'react-redux';
import { openSettingsModal } from '../../../slices/system.slice';

const UtilityControls = (): JSX.Element => {
    const dispatch = useDispatch();

    const handleSettingsModalOpen = (): void => {
        dispatch(openSettingsModal());
    };

    return <View onSettingsClick={handleSettingsModalOpen} />;
};

export default UtilityControls;
