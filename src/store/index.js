import { combineReducers, } from 'redux';
import { combineEpics, } from 'redux-observable';

import addCreditReducer from './reducers/addCredit';
import productsReducer from './reducers/products';
import addCreditEpic from './epics/addCredit/addCredit';
import productsEpic from './epics/products/products';

export const baseReducer = combineReducers({
    addCredit: addCreditReducer,
    productsStore: productsReducer,
});

export const rootEpic = combineEpics(
    addCreditEpic,
    productsEpic,
);


