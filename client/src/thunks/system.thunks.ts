/**
 * system.thunks.ts
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkAPI } from '../types/thunks.types';

export const testThunk = createAsyncThunk<undefined, undefined, IThunkAPI>(
    'system/test',
    (data, thunkAPI) => {
        console.log('Testing...');
        return undefined;
    }
);
