/**
 * workspace.slice.ts
 */

import { createSlice } from '@reduxjs/toolkit';
import {
    createWorkspaceThunk,
    deleteWorkspaceThunk,
    getWorkspacesThunk,
    switchWorkspaceThunk,
    updateWorkspaceThunk
} from '../thunks/workspace.thunks';
import { IWorkspaceState } from '../types/workspace.types';

const workspaceSlice = createSlice({
    name: 'workspace',
    initialState: {
        workspaces: [],
        current: undefined,
        focused: undefined,
        isWorkspaceModalOpened: false,
        isDeleteWorkspaceAlertOpened: false
    } as IWorkspaceState,
    reducers: {
        setCurrentWorkspace: (
            state,
            {
                payload: { workspaceId }
            }: {
                payload: {
                    workspaceId: string;
                };
            }
        ): void => {
            state.current = workspaceId;
        },
        openWorkspaceModal: (
            state,
            {
                payload: { workspaceId }
            }: {
                payload: {
                    workspaceId?: string;
                };
            }
        ): void => {
            state.focused = workspaceId;
            state.isWorkspaceModalOpened = true;
        },
        closeWorkspaceModal: (state): void => {
            state.isWorkspaceModalOpened = false;
            state.focused = undefined;
        },
        openDeleteWorkspaceAlert: (state): void => {
            state.isDeleteWorkspaceAlertOpened = true;
        },
        closeDeleteWorkspaceAlert: (state): void => {
            state.isDeleteWorkspaceAlertOpened = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(getWorkspacesThunk.fulfilled, (state, { payload }) => {
            state.workspaces = payload.workspaces;
        });
        builder.addCase(
            createWorkspaceThunk.fulfilled,
            (state, { payload }) => {
                state.workspaces = payload.workspaces;
                state.current = payload.newWorkspace._id;
            }
        );
        builder.addCase(
            updateWorkspaceThunk.fulfilled,
            (state, { payload }) => {
                state.workspaces = payload.workspaces;
            }
        );
        builder.addCase(
            deleteWorkspaceThunk.fulfilled,
            (state, { payload }) => {
                state.current = payload.currentWorkspaceId;
                state.workspaces = payload.workspaces;
            }
        );
        builder.addCase(
            switchWorkspaceThunk.fulfilled,
            (state, { payload }) => {
                state.current = payload.currentWorkspaceId;
            }
        );
    }
});

export const {
    setCurrentWorkspace,
    openWorkspaceModal,
    closeWorkspaceModal,
    openDeleteWorkspaceAlert,
    closeDeleteWorkspaceAlert
} = workspaceSlice.actions;
export default workspaceSlice.reducer;
