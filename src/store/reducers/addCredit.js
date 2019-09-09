import { handleActions, } from 'redux-actions';
import { reduce, compose, } from 'ramda';

import addCreditActions from '../actions/addCredit';

const { credit, } = addCreditActions;

const INITIAL_STATE = {
    totalCredit: 0,
}
export default handleActions(
    {
        [credit.add]: (state, { payload, }) => ({
            ...state,
            totalCredit: parseInt(state.totalCredit, 10) + parseInt(payload, 0),
            enableKeypad: true,
          }),
          [credit.resetTotalCredit]: (state, { payload, }) => ({
            ...state,
            totalCredit: 0,
            enableKeypad: false,
          }),
    },
    INITIAL_STATE,
);