import React from 'react';
import { Provider } from 'react-redux';
import moment from 'moment';
import { ThemeProvider, injectGlobal } from 'styled-components';
import configureStore from './redux/confugureStore';

moment.locale('ru');

import theme from '~/theme';
import Root from '~/scenes/Root';
import './theme/style.css';
import '../node_modules/react-toastify/dist/ReactToastify.css';

export default () => (
    <Provider store={configureStore()}>
        <ThemeProvider theme={theme}>
            <Root />
        </ThemeProvider>
    </Provider>
);