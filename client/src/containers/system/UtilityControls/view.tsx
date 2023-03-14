/**
 * UtilityControls/view.tsx
 */

import { Button, Icon } from '@blueprintjs/core';
import React from 'react';
import styled from 'styled-components';

interface IPropTypes {
    onSettingsClick: (event?: React.MouseEvent<HTMLElement>) => void;
}

const Styles = styled.div`
    .rounded-button {
        border-radius: 50%;
    }
`;

const View = ({ onSettingsClick }: IPropTypes): JSX.Element => {
    const settingsButtonIcon = <Icon iconSize={24} icon='cog' />;

    return (
        <Styles>
            <Button
                large
                minimal
                className='rounded-button'
                icon={settingsButtonIcon}
                onClick={onSettingsClick}
            />
        </Styles>
    );
};

export default View;
