/**
 * thunks.types.ts
 */

import { AppDispatch, AppState } from '../store';
import { IErrorResponse } from './protocols/error.protocols';

export interface IThunkAPI {
    dispatch: AppDispatch;
    state?: AppState;
    extra?: unknown;
    rejectValue?: IErrorResponse | string;
}
