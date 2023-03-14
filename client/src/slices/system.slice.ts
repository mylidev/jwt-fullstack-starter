/**
 * system.slice.ts
 */

import { createSlice } from '@reduxjs/toolkit';
//import {} from '../thunks/system.thunks';

const systemSlice = createSlice({
    name: 'system',
    initialState: {
        isSettingsModalOpened: false
    },
    reducers: {
        openSettingsModal: (state): void => {
            state.isSettingsModalOpened = true;
        },
        closeSettingsModal: (state): void => {
            state.isSettingsModalOpened = false;
        }
    },
    extraReducers: {}
});

export const { openSettingsModal, closeSettingsModal } = systemSlice.actions;
export default systemSlice.reducer;
