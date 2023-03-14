/**
 * GlobalStyles.ts
 */

import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    .bp3-button-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: normal;
    }
`;
