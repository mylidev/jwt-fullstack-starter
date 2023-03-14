/**
 * CreateWorkspaceForm/index.tsx
 */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import { closeWorkspaceModal } from '../../../slices/workspace.slice';
import { createWorkspaceThunk } from '../../../thunks/workspace.thunks';
import { ICreateWorkspaceResponse } from '../../../types/protocols/workspace.protocols';
import View from './view';

const CreateWorkspaceForm = (): JSX.Element => {
    const dispatch = useDispatch();

    const [state, setState] = useState({
        disabled: false,
        name: '',
        initial: {
            name: ''
        }
    });

    const getButtonStatus = (): boolean => {
        if (
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
                name: ''
            }));
        }
    };

    const handleNameCancel = (value: string): void => {
        setState(previousState => ({
            ...previousState,
            name: ''
        }));
    };

    const handleCreateWorkspace = async (): Promise<void> => {
        setState(previousState => ({
            ...previousState,
            updateSubmitting: true
        }));
        const response = await dispatch(
            createWorkspaceThunk({
                name: state.name
            }) as any
        );
        setState(previousState => ({
            ...previousState,
            updateSubmitting: false
        }));
        const payload = response.payload as ICreateWorkspaceResponse;
        if (!payload.error) {
            dispatch(closeWorkspaceModal());
        }
    };

    return (
        <View
            disabled={getButtonStatus()}
            name={state.name}
            onNameChange={handleNameChange}
            onNameConfirm={handleNameConfirm}
            onNameCancel={handleNameCancel}
            onFormSubmit={handleCreateWorkspace}
        />
    );
};

export default CreateWorkspaceForm;
