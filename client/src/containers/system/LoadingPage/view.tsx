/**
 * LoadingPage/view.tsx
 */

import { Spinner } from '@blueprintjs/core';
import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const View = (): JSX.Element => {
    return (
        <Styles>
            <Spinner size={64} />
        </Styles>
    );
};

export default View;
