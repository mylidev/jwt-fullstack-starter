/**
 * SettingsModal/view.tsx
 */

import {
    Button,
    Classes,
    Dialog,
    H3,
    Icon,
    IconName,
    Intent,
    Menu,
    MenuDivider,
    MenuItem
} from '@blueprintjs/core';
import React from 'react';
import styled from 'styled-components';
import AccountSettingsForm from '../../account/AccountSettingsForm';
import WorkspaceSettingsForm from '../../workspace/WorkspaceSettingsForm';

interface IPropTypes {
    isModalOpened: boolean;
    selected: number;
    onSelect: (index: number) => void;
    onSignOutClick: () => void;
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

    .menu-title {
        padding: 3px;
        margin: 3px;
    }
`;

const Modal = ({
    isModalOpened,
    selected,
    onSelect,
    onSignOutClick,
    onModalClose
}: IPropTypes): JSX.Element => {
    const settingsContent = [
        {
            icon: 'user',
            text: 'Account',
            content: <AccountSettingsForm />
        },
        {
            icon: 'box',
            text: 'Workspace',
            content: <WorkspaceSettingsForm />
        }
    ];

    const getMenuItems = (): Array<JSX.Element> => {
        return settingsContent.map((item, index) => {
            return (
                <MenuItem
                    key={index}
                    active={selected === index}
                    icon={item.icon as IconName}
                    text={item.text}
                    onClick={() => {
                        onSelect(index);
                    }}
                />
            );
        });
    };

    return (
        <Dialog
            style={{ height: '45rem', width: '60rem', paddingBottom: '0rem' }}
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
                <Menu>
                    <H3 className='menu-title'>Settings</H3>
                    {getMenuItems()}
                    <MenuDivider />
                    <MenuItem
                        intent={Intent.DANGER}
                        icon='log-out'
                        text='Sign Out'
                        onClick={() => {
                            onSignOutClick();
                        }}
                    />
                </Menu>
                {settingsContent[selected].content}
            </Styles>
        </Dialog>
    );
};

export default Modal;
