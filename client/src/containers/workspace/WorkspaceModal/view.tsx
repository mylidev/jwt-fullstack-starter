/**
 * WorkspaceModal/view.tsx
 */

import { Button, Classes, Dialog, Icon } from '@blueprintjs/core';
import React from 'react';
import styled from 'styled-components';
import { IWorkspace } from '../../../types/workspace.types';
import CreateWorkspaceForm from '../CreateWorkspaceForm';
import UpdateAndDeleteWorkspaceForm from '../UpdateAndDeleteWorkspaceForm';

interface IPropTypes {
    isModalOpened: boolean;
    workspace: IWorkspace | undefined;
    onModalClose: () => void;
}

const Styles = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    padding: 0rem;
    position: relative;

    .close-button {
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
    }
`;

const View = ({
    isModalOpened,
    workspace,
    onModalClose
}: IPropTypes): JSX.Element => {
    return (
        <Dialog
            style={{
                height: '45rem',
                width: '60rem',
                paddingBottom: '0rem'
            }}
            isOpen={isModalOpened}
            onClose={onModalClose}
        >
            <Styles>
                <Button
                    className={`close-button ${Classes.DIALOG_CLOSE_BUTTON}`}
                    minimal
                    icon={<Icon iconSize={20} icon='small-cross' />}
                    onClick={onModalClose}
                />
                {workspace ? (
                    <UpdateAndDeleteWorkspaceForm />
                ) : (
                    <CreateWorkspaceForm />
                )}
            </Styles>
        </Dialog>
    );
};

export default View;
