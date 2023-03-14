/**
 * ObjectModal/view.tsx
 */

import React from 'react';
import styled from 'styled-components';

interface IPropTypes {
    test?: string;
}

const Styles = styled.div``;

const View = ({ test }: IPropTypes): JSX.Element => {
    return <Styles>ObjectModal</Styles>;
};

export default View;
