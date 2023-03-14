/**
 * workspace.types.ts
 */

export interface IWorkspace {
    _id: string;
    account: string;
    name: string;
}

export interface IWorkspaceState {
    workspaces: Array<IWorkspace>;
    current: undefined | string;
    focused: undefined | string;
    isWorkspaceModalOpened: boolean;
    isDeleteWorkspaceAlertOpened: boolean;
}
