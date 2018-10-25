import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const logger = createLogger({

});

import rootReducer from './reducer';

export default () =>
    (process.env.NODE_ENV === 'development') ?
        createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))) :
        createStore(rootReducer, compose(applyMiddleware(thunk)));