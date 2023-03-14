/**
 * WorkspaceContent/index.tsx
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { currentWorkspaceSelector } from '../../../selectors/workspace.selectors';
import { IWorkspace } from '../../../types/workspace.types';
import View from './view';

const WorkspaceContent = (): JSX.Element => {
    const currentWorkspace = useSelector(
        currentWorkspaceSelector
    ) as IWorkspace;

    return (
        <View
            sidebarPlaceholder={currentWorkspace?.name}
            contentPlaceholder={currentWorkspace?.name}
        />
    );
};

export default WorkspaceContent;
