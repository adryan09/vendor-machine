import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { compose, createStore, applyMiddleware, } from 'redux';
import { Provider, } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import { baseReducer, rootEpic, } from './store/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware();
const store = createStore(baseReducer, {}, composeEnhancers(applyMiddleware(epicMiddleware)));
epicMiddleware.run(rootEpic);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
