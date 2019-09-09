import { ofType, combineEpics, } from 'redux-observable';
import { map, flatMap, pluck, ignoreElements, filter, } from 'rxjs/operators';
import addCreditActions from '../../actions/addCredit';
import productActions from '../../actions/getProducts';

const { credit, } = addCreditActions;
const { product, } = productActions;

const addCreditEpic = (action$) => action$.pipe(
    ofType(credit.add),
    map(() => credit.enableKeypad()),
)

const resetTotalCredit = (action$) => action$.pipe(
    ofType(product.reset),
    map(() => credit.resetTotalCredit()),
)

export default combineEpics(
    addCreditEpic,
    resetTotalCredit,
);