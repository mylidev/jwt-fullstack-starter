/**
 * WorkspaceContent/view.tsx
 */

import React from 'react';
import styled from 'styled-components';

interface IPropTypes {
    sidebarPlaceholder: string;
    contentPlaceholder: string;
}

const Styles = styled.div`
    display: flex;
`;

const Sidebar = styled.div`
    height: calc(100vh - 3rem);
    width: 18rem;
    padding: 0.5rem;
    background-color: #a7b6c2;
`;

const Content = styled.div`
    height: calc(100vh - 3rem);
    width: calc(100vw - 18rem);
    padding: 0.5rem;
    background-color: #bfccd6;
`;

const View = ({
    sidebarPlaceholder,
    contentPlaceholder
}: IPropTypes): JSX.Element => {
    return (
        <Styles>
            <Sidebar>{`${sidebarPlaceholder}'s Sidebar`}</Sidebar>
            <Content>{`${contentPlaceholder}'s Content`}</Content>
        </Styles>
    );
};

export default View;
