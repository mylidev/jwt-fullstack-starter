/**
 * UpdateAndDeleteWorkspaceForm/index.tsx
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import {
    focusedWorkspaceSelector,
    isDeleteWorkspaceAlertOpenedSelector
} from '../../../selectors/workspace.selectors';
import {
    closeDeleteWorkspaceAlert,
    closeWorkspaceModal,
    openDeleteWorkspaceAlert
} from '../../../slices/workspace.slice';
import {
    deleteWorkspaceThunk,
    updateWorkspaceThunk
} from '../../../thunks/workspace.thunks';
import { IErrorResponse } from '../../../types/protocols/error.protocols';
import { IUpdateWorkspaceResponse } from '../../../types/protocols/workspace.protocols';
import { IWorkspace } from '../../../types/workspace.types';
import View from './view';

const UpdateAndDeleteWorkspaceForm = (): JSX.Element => {
    const dispatch = useDispatch();

    const focusedWorkspace = useSelector(
        focusedWorkspaceSelector
    ) as IWorkspace;
    const isDeleteWorkspaceAlertOpened = useSelector(
        isDeleteWorkspaceAlertOpenedSelector
    );

    const [state, setState] = useState({
        disabled: false,
        name: '',
        initial: {
            name: ''
        }
    });

    useEffect(() => {
        setState(previousState => ({
            ...previousState,
            name: focusedWorkspace.name,
            initial: {
                name: focusedWorkspace.name
            }
        }));
        // eslint-disable-next-line
    }, []);

    const getButtonStatus = (): boolean => {
        if (
            !state.name ||
            validator.isEmpty(state.name, { ignore_whitespace: true }) ||
            state.name === state.initial.name ||
            state.disabled
        ) {
            return true;
        }
        return false;
    };

    const handleNameChange = (value: string): void => {
        setState(previousState => ({
            ...previousState,
            name: value
        }));
    };

    const handleNameConfirm = (value: string): void => {
        if (validator.isEmpty(value, { ignore_whitespace: true })) {
            setState(previousState => ({
                ...previousState,
                name: focusedWorkspace.name
            }));
        }
    };

    const handleNameCancel = (value: string): void => {
        setState(previousState => ({
            ...previousState,
            name: focusedWorkspace.name
        }));
    };

    const handleUpdateWorkspace = async (): Promise<void> => {
        setState(previousState => ({
            ...previousState,
            disabled: true
        }));
        const response = await dispatch(
            updateWorkspaceThunk({
                workspaceId: focusedWorkspace._id,
                updates: { name: state.name }
            }) as any
        );
        setState(previousState => ({
            ...previousState,
            disabled: false
        }));
        const payload = response.payload as
            | IUpdateWorkspaceResponse
            | IErrorResponse;
        if (!payload.error) {
            setState(previousState => ({
                ...previousState,
                initial: {
                    name: (payload as IUpdateWorkspaceResponse).updatedWorkspace
                        .name
                }
            }));
        }
    };

    const handleDeleteWorkspace = (): void => {
        if (focusedWorkspace) {
            dispatch(
                deleteWorkspaceThunk({ workspaceId: focusedWorkspace._id })
            );
        }
        dispatch(closeDeleteWorkspaceAlert());
        dispatch(closeWorkspaceModal());
    };

    const handleDeleteWorkspaceAlertOpen = (): void => {
        dispatch(openDeleteWorkspaceAlert());
    };

    const handleDeleteWorkspaceAlertClose = (): void => {
        dispatch(closeDeleteWorkspaceAlert());
    };

    return (
        <View
            isAlertOpened={isDeleteWorkspaceAlertOpened}
            disabled={getButtonStatus()}
            name={state.name}
            namePlaceholder={state.initial.name}
            onNameChange={handleNameChange}
            onNameConfirm={handleNameConfirm}
            onNameCancel={handleNameCancel}
            onUpdateButtonClick={handleUpdateWorkspace}
            onDeleteButtonClick={handleDeleteWorkspaceAlertOpen}
            onAlertConfirm={handleDeleteWorkspace}
            onAlertCancel={handleDeleteWorkspaceAlertClose}
        />
    );
};

export default UpdateAndDeleteWorkspaceForm;
