/**
 * workspace.protocols.ts
 */

/* REQUESTS */

export interface ICreateWorkspaceRequest {
    name: string;
}

export interface IUpdateWorkspaceRequest {
    name?: string;
}

/* RESPONSES */

export interface IGetWorkspacesResponse {
    error: boolean;
    workspaces: Array<{
        _id: string;
        account: string;
        name: string;
    }>;
}

export interface ICreateWorkspaceResponse {
    error: boolean;
    newWorkspace: {
        _id: string;
        account: string;
        name: string;
    };
    workspaces: Array<{
        _id: string;
        account: string;
        name: string;
    }>;
}

export interface IGetWorkspaceDetailsResponse {
    error: boolean;
    workspace: {
        _id: string;
        account: string;
        name: string;
    };
}
export interface IUpdateWorkspaceResponse {
    error: boolean;
    updatedWorkspace: {
        _id: string;
        account: string;
        name: string;
    };
    workspaces: Array<{
        _id: string;
        account: string;
        name: string;
    }>;
}
export interface IDeleteWorkspaceResponse {
    error: boolean;
    currentWorkspaceId: string;
    workspaces: Array<{
        _id: string;
        account: string;
        name: string;
    }>;
}

export interface ISwitchWorkspaceResponse {
    error: boolean;
    currentWorkspaceId: string;
}
