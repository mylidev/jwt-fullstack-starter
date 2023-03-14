/**
 * index.tsx
 */

// store has to be above Router otherwise everything will crash...

import '@blueprintjs/core/lib/css/blueprint.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'sanitize.css';
import { store } from './store';
import Router from './containers/Router';
import GlobalStyles from './GlobalStyles';

ReactDOM.render(
    <Provider store={store}>
        <GlobalStyles />
        <Router />
    </Provider>,
    document.getElementById('root')
);
