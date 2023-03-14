/**
 * workspace.thunks.ts
 */

import { Intent } from '@blueprintjs/core';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkAPI } from '../types/thunks.types';
import { IGetAccountDetailsResponse } from '../types/protocols/account.protocols';
import {
    ICreateWorkspaceRequest,
    ICreateWorkspaceResponse,
    IDeleteWorkspaceResponse,
    IGetWorkspacesResponse,
    ISwitchWorkspaceResponse,
    IUpdateWorkspaceRequest,
    IUpdateWorkspaceResponse
} from '../types/protocols/workspace.protocols';
import api from '../utils/api';
import handleThunkError from '../utils/error';
import toast from '../utils/toast';

const workspacePath = '/workspace';

export const getWorkspacesThunk = createAsyncThunk<
    IGetWorkspacesResponse,
    undefined,
    IThunkAPI
>('workspace/getWorkspaces', async (data, thunkAPI) => {
    try {
        const response = await api.get<IGetWorkspacesResponse>(
            `${workspacePath}/`
        );
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err));
    }
});

export const createWorkspaceThunk = createAsyncThunk<
    ICreateWorkspaceResponse,
    ICreateWorkspaceRequest,
    IThunkAPI
>('workspace/createWorkspace', async (data, thunkAPI) => {
    try {
        const response = await api.post<ICreateWorkspaceResponse>(
            `${workspacePath}/`,
            data
        );
        await api.post(
            `${workspacePath}/switch/${response.data.newWorkspace._id}`
        );
        toast('tick', Intent.SUCCESS, 'Successfully created new workspace.');
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err));
    }
});

export const getWorkspaceDetailsThunk = createAsyncThunk<
    IGetAccountDetailsResponse,
    { workspaceId: string },
    IThunkAPI
>('workspace/getWorkspaceDetails', async (data, thunkAPI) => {
    try {
        const { workspaceId } = data;
        const response = await api.get<IGetAccountDetailsResponse>(
            `${workspacePath}/${workspaceId}`
        );
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err));
    }
});

export const updateWorkspaceThunk = createAsyncThunk<
    IUpdateWorkspaceResponse,
    {
        workspaceId: string;
        updates: IUpdateWorkspaceRequest;
    },
    IThunkAPI
>('workspace/updateWorkspace', async (data, thunkAPI) => {
    try {
        const { workspaceId, updates } = data;
        const response = await api.post<IUpdateWorkspaceResponse>(
            `${workspacePath}/${workspaceId}`,
            updates
        );
        toast('tick', Intent.SUCCESS, 'Successfully updated workspace.');
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err));
    }
});

export const deleteWorkspaceThunk = createAsyncThunk<
    IDeleteWorkspaceResponse,
    { workspaceId: string },
    IThunkAPI
>('workspace/deleteWorkspace', async (data, thunkAPI) => {
    try {
        const { workspaceId } = data;
        const response = await api.delete<IDeleteWorkspaceResponse>(
            `${workspacePath}/${workspaceId}`
        );
        toast('tick', Intent.SUCCESS, 'Successfully deleted workspace.');
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err));
    }
});

export const switchWorkspaceThunk = createAsyncThunk<
    ISwitchWorkspaceResponse,
    { workspaceId: string },
    IThunkAPI
>('workspace/switchWorkspace', async (data, thunkAPI) => {
    try {
        const { workspaceId } = data;
        const response = await api.post<ISwitchWorkspaceResponse>(
            `${workspacePath}/switch/${workspaceId}`
        );
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(handleThunkError(err));
    }
});
