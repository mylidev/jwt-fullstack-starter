/**
 * ActionableMenuItem.tsx
 */

import { Button, IconName, MenuItem } from '@blueprintjs/core';
import React, { useState } from 'react';
import styled from 'styled-components';

interface IPropTypes {
    className?: string;
    active: boolean;
    text: string;
    itemIcon: IconName;
    actionIcon: IconName;
    onItemClick: () => void;
    onActionClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const Styles = styled.div``;

const ActionableMenuItem = ({
    className,
    active,
    text,
    itemIcon,
    actionIcon,
    onItemClick,
    onActionClick
}: IPropTypes): JSX.Element => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = (): void => {
        setIsHovered(true);
    };

    const handleMouseLeave = (): void => {
        setIsHovered(false);
    };

    const actionElement = (
        <Button minimal icon={actionIcon} onClick={onActionClick} />
    );

    return (
        <Styles>
            <MenuItem
                className={className}
                active={active}
                text={text}
                icon={itemIcon}
                labelElement={isHovered ? actionElement : undefined}
                onClick={onItemClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
        </Styles>
    );
};

export default ActionableMenuItem;
