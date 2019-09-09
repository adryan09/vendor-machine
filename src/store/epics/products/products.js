import { ofType, combineEpics, } from 'redux-observable';
import { mapTo, pluck, flatMap, map, takeUntil, take, switchMap, mergeMap, tap, } from 'rxjs/operators';
import { interval, timer, } from 'rxjs';
import productActions from '../../actions/getProducts';
import creditActions from '../../actions/addCredit';

import { totalCreditSelector, productsSelector,  totalSumProductSelector, } from '../../selectors/keypad'

import { of } from 'rxjs';
const { product, } = productActions;
const { credit, } = creditActions;

const getProductsEpic = (action$) => action$.pipe(
    ofType(product.get),
    mapTo(() => product.get()),
)

const getProduct = (action$, state$) => action$.pipe(
    ofType(product.requestProduct),
    pluck('payload'),
    flatMap(({ letterType, idx, }) => {
        const lineIdx = mapLetterToIdx[letterType];
        const products = productsSelector(state$.value);
        const totalCreditEntered = totalCreditSelector(state$.value);   
        const totalSumProducts = totalSumProductSelector(state$.value);
        const foundLine = products[lineIdx];
        const result =  foundLine.map((el, i) => {
            if(idx === i) {
                const { nrItems, price, name, } = el;
                const totalSum = totalSumProducts + price;
                if (totalSum > totalCreditEntered) {
                    return {type: 'NOT_ALLOWED'}
                }

                if(totalSum === totalCreditEntered) {
                    return {lineIdx, i, name}; // get product and reset machine as no rest money is available to get back or pay for someting
                }
                if (nrItems === 0) {
                    return {type: 'NO_MORE_ITEMS'}
                }
                if (nrItems >= 1 && totalCreditEntered > price) {
                    return {lineIdx, i, name};
                }
                
            }
        })
        const res = result.find((val) => val != undefined)

        if (res.type === 'NOT_ALLOWED') {
            return of(product.notEnoughCredit());
        } else {
          return res.type === 'NO_MORE_ITEMS' ? of(product.noMoreItems()) : of(product.retrieveProductItem(res));  
        }
    })
);
const removeNoMoreItemsMsgEpic = (action$) => action$.pipe(
    ofType(product.retrieveProductItem),
    map(() => product.removeNoMoreItemsMsg())
)
const remainingCreditEpic = (action$, state$) => action$.pipe(
    ofType(credit.add, product.retrieveProductItem),
    flatMap(() => {
        const totalSumProducts = totalSumProductSelector(state$.value);
        const totalCreditEntered = totalCreditSelector(state$.value);   
        const remainingSum = totalCreditEntered - totalSumProducts;
        if (remainingSum === 0) {
            return (interval(1000).pipe(takeUntil(timer(3000))).pipe(mapTo((product.reset()))))
        }
        return of(product.remainingCredit(remainingSum));
    }),
);

const getBackCreditEpic = (action$) => action$.pipe(
    ofType(credit.getCreditBack),
    map(() => product.reset())
);

const shortTimeDisplayEpic = (action$) => action$.pipe(
    ofType(product.notEnoughCredit),
    mergeMap(() => (interval(1000).pipe(takeUntil(timer(2000))).pipe(mapTo((product.stopRenderNoEnoughMoney())))))
); 

const mapLetterToIdx = {
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3,
};

export default combineEpics(
    getProductsEpic,
    getProduct,
    remainingCreditEpic,
    getBackCreditEpic,
    shortTimeDisplayEpic,
    removeNoMoreItemsMsgEpic,
);