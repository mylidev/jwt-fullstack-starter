/**
 * ApplicationPage/view.tsx
 */

import React from 'react';
import styled from 'styled-components';
import WorkspaceContent from '../../workspace/WorkspaceContent';
import WorkspaceMenu from '../../workspace/WorkspaceMenu';
import WorkspaceModal from '../../workspace/WorkspaceModal';
import LoadingPage from '../LoadingPage';
import SettingsModal from '../SettingsModal';
import UtilityControls from '../UtilityControls';

interface IPropTypes {
    loading: boolean;
}

const Styles = styled.div`
    height: 100vh;
    width: 100vw;
`;

const Header = styled.div`
    height: 3rem;
    width: 100vw;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #8a9ba8;
`;

const Body = styled.div`
    height: calc(100vh - 3rem);
    width: 100vw;
`;

const View = ({ loading }: IPropTypes): JSX.Element => {
    if (loading) {
        return <LoadingPage />;
    }
    return (
        <Styles>
            <Header>
                <WorkspaceMenu />
                <UtilityControls />
            </Header>
            <Body>
                <WorkspaceContent />
            </Body>
            <SettingsModal />
            <WorkspaceModal />
        </Styles>
    );
};

export default View;
