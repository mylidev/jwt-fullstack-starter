/**
 * object.thunks.ts
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkAPI } from '../types/thunks.types';
import api, { publicClient } from '../utils/api';
import handleThunkError from '../utils/error';
import toast from '../utils/toast';

const objectPath = '/object';
