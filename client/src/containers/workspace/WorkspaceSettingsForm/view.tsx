/**
 * WorkspaceSettingsForm/view.tsx
 */

import { H3 } from '@blueprintjs/core';
import React from 'react';
import styled from 'styled-components';

interface IPropTypes {
    test?: string;
}

const Styles = styled.div`
    height: 100%;
    width: 100%;
    padding: calc(1rem - 5px);
`;

const View = ({ test }: IPropTypes): JSX.Element => {
    return (
        <Styles>
            <H3>Workspace</H3>
        </Styles>
    );
};

export default View;
