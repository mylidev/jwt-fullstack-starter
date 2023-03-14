/**
 * store.ts
 */

import {
    combineReducers,
    configureStore,
    getDefaultMiddleware
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import accountReducer from './slices/account.slice';
import systemReducer from './slices/system.slice';
import workspaceReducer from './slices/workspace.slice';
import objectReducer from './slices/object.slice';

const rootReducer = combineReducers({
    system: systemReducer,
    account: accountReducer,
    workspace: workspaceReducer,
    object: objectReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware<AppState>(), logger] as const
});

export type AppDispatch = typeof store.dispatch;
