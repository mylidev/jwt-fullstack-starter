/**
 * WorkspaceMenu/view.tsx
 */

import {
    Button,
    Intent,
    Menu,
    MenuDivider,
    MenuItem,
    Popover
} from '@blueprintjs/core';
import React from 'react';
import styled from 'styled-components';
import ActionableMenuItem from '../../../components/ActionableMenuItem';
import { IWorkspace } from '../../../types/workspace.types';

interface IPropTypes {
    workspaces: Array<IWorkspace>;
    currentIndex: number;
    onSwitch: (index: number) => void;
    onEdit: (event: React.MouseEvent<HTMLElement>, index: number) => void;
    onCreate: () => void;
}

const Styles = styled.div`
    .button-styles {
        height: 30px;
        width: 17rem;
        justify-content: space-between;
    }

    .menu-styles {
        width: 17rem;
    }

    .menu-item-styles {
        min-height: 40px;
        align-items: center;
    }
`;

const View = ({
    workspaces,
    currentIndex,
    onSwitch,
    onEdit,
    onCreate
}: IPropTypes): JSX.Element => {
    const getMenuItems = (): Array<JSX.Element> => {
        return workspaces.map((workspace, index) => {
            return (
                <ActionableMenuItem
                    className='menu-item-styles'
                    key={index}
                    active={index === currentIndex}
                    text={workspace.name}
                    itemIcon='box'
                    actionIcon='edit'
                    onItemClick={() => {
                        onSwitch(index);
                    }}
                    onActionClick={(event: React.MouseEvent<HTMLElement>) => {
                        onEdit(event, index);
                    }}
                />
            );
        });
    };

    const menuElement = (
        <Styles>
            <Menu className='menu-styles'>
                {getMenuItems()}
                <MenuDivider />
                <MenuItem
                    className='menu-item-styles'
                    intent={Intent.SUCCESS}
                    icon='add'
                    text='Create New Workspace'
                    onClick={(): void => {
                        onCreate();
                    }}
                />
            </Menu>
        </Styles>
    );

    return (
        <Styles>
            <Popover content={menuElement}>
                <Button
                    className='button-styles'
                    minimal
                    text={workspaces[currentIndex].name}
                    icon='cube'
                    rightIcon='chevron-down'
                />
            </Popover>
        </Styles>
    );
};

export default View;
