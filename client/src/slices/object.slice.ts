/**
 * object.slice.ts
 */

import { createSlice } from '@reduxjs/toolkit';
import { IObjectState } from '../types/object.types';

const objectSlice = createSlice({
    name: 'object',
    initialState: {} as IObjectState,
    reducers: {},
    extraReducers: builder => {}
});

export const {} = objectSlice.actions;
export default objectSlice.reducer;
