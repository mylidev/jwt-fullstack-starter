/**
 * system.selectors.ts
 */

import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { ISystemState } from '../types/system.types';

const systemStateSelector = (state: AppState): ISystemState => state.system;

export const isSettingsModalOpenedSelector = createSelector(
    systemStateSelector,
    systemState => systemState.isSettingsModalOpened
);
