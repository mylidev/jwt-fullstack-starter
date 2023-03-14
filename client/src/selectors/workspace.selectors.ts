/**
 * workspace.selectors.ts
 */

import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { IWorkspaceState } from '../types/workspace.types';

const workspaceStateSelector = (state: AppState): IWorkspaceState =>
    state.workspace;

export const workspacesSelector = createSelector(
    workspaceStateSelector,
    workspaceState => workspaceState.workspaces
);

export const currentWorkspaceSelector = createSelector(
    workspaceStateSelector,
    workspaceState => {
        if (!workspaceState.current) {
            return undefined;
        }
        const currentWorkspaceId = workspaceState.current;
        return workspaceState.workspaces.find(
            workspace => workspace._id === currentWorkspaceId
        );
    }
);

export const currentWorkspaceIndexSelector = createSelector(
    workspaceStateSelector,
    workspaceState => {
        const currentWorkspaceId = workspaceState.current;
        return workspaceState.workspaces.findIndex(
            workspace => workspace._id === currentWorkspaceId
        );
    }
);

export const focusedWorkspaceSelector = createSelector(
    workspaceStateSelector,
    workspaceState => {
        if (!workspaceState.focused) {
            return undefined;
        }
        const focusedWorkspaceId = workspaceState.focused;
        return workspaceState.workspaces.find(
            workspace => workspace._id === focusedWorkspaceId
        );
    }
);

export const isWorkspaceModalOpenedSelector = createSelector(
    workspaceStateSelector,
    workspaceState => workspaceState.isWorkspaceModalOpened
);

export const isDeleteWorkspaceAlertOpenedSelector = createSelector(
    workspaceStateSelector,
    workspaceState => workspaceState.isDeleteWorkspaceAlertOpened
);
