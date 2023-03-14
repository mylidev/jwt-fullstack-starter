/**
 * WorkspaceMenu/index.tsx
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    currentWorkspaceIndexSelector,
    workspacesSelector
} from '../../../selectors/workspace.selectors';
import { openWorkspaceModal } from '../../../slices/workspace.slice';
import { switchWorkspaceThunk } from '../../../thunks/workspace.thunks';
import View from './view';

const WorkspaceMenu = (): JSX.Element => {
    const dispatch = useDispatch();

    const workspaces = useSelector(workspacesSelector);
    const currentWorkspaceIndex = useSelector(currentWorkspaceIndexSelector);

    const handleWorkspaceSwitch = (index: number): void => {
        if (index !== currentWorkspaceIndex) {
            dispatch(
                switchWorkspaceThunk({ workspaceId: workspaces[index]._id })
            );
        }
    };

    const handleUpdateWorkspaceModalOpen = (
        event: React.MouseEvent<HTMLElement>,
        index: number
    ): void => {
        event?.stopPropagation();
        dispatch(openWorkspaceModal({ workspaceId: workspaces[index]._id }));
    };

    const handleCreateWorkspaceModalOpen = (): void => {
        dispatch(openWorkspaceModal({}));
    };

    return (
        <View
            workspaces={workspaces}
            currentIndex={currentWorkspaceIndex}
            onSwitch={handleWorkspaceSwitch}
            onEdit={handleUpdateWorkspaceModalOpen}
            onCreate={handleCreateWorkspaceModalOpen}
        />
    );
};

export default WorkspaceMenu;
