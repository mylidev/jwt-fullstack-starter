/**
 * WorkspaceModal/index.tsx
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    focusedWorkspaceSelector,
    isWorkspaceModalOpenedSelector
} from '../../../selectors/workspace.selectors';
import { closeWorkspaceModal } from '../../../slices/workspace.slice';
import View from './view';

const WorkspaceModal = (): JSX.Element => {
    const dispatch = useDispatch();

    const focusedWorkspace = useSelector(focusedWorkspaceSelector);
    const isWorkspaceModalOpened = useSelector(isWorkspaceModalOpenedSelector);

    const handleWorkspaceModalClose = (): void => {
        dispatch(closeWorkspaceModal());
    };

    return (
        <View
            isModalOpened={isWorkspaceModalOpened}
            workspace={focusedWorkspace}
            onModalClose={handleWorkspaceModalClose}
        />
    );
};

export default WorkspaceModal;
