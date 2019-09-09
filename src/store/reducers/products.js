import { handleActions, } from 'redux-actions';
import { reduce, compose, remove, insert, } from 'ramda';

import productActions from '../actions/getProducts';
import addCreditActions from '../actions/addCredit';
const { product, } = productActions;
const { credit, } = addCreditActions;

const INITIAL_STATE = {
    products: [
        [{ name: 'coke', nrItems: 10, price: 10, },
            { name: 'pepsi', nrItems: 5, price: 5, },
            {name: 'fanta', nrItems: 8, price: 10, }, 
            { name: 'sprite', nrItems: 10, price: 20, }],
        [{ name: 'milka', nrItems: 10, price: 30, },
            { name: 'mars', nrItems: 10, price: 5, },
            {name: 'snikers', nrItems: 8, price: 5, }, 
            { name: 'twix', nrItems: 10, price: 25, }],
        [ { name: 'lays', nrItems: 10, price: 50, },
            { name: 'chio', nrItems: 10, price: 30, },
            {name: 'pringles', nrItems: 10, price: 14, }, 
            { name: 'popchips', nrItems: 10, price: 20, }],
        [{ name: 'eureka', nrItems: 2, price: 5, },
            { name: 'rudis', nrItems: 10, price: 9, },
            {name: 'peperidge', nrItems: 10, price: 25, }, 
            { name: 'swirl bread', nrItems: 10, price: 30}],     
    ], 
    totalSumProducts: 0,
    notEnoughCredit: false,
    disableKeypad: false,
    remainingCredit: null,
    stopRenderNoEnoughMoney: false,
    pickedProduct: null,
    noItemsAnymore: false,
}

export default handleActions(
    {
        [product.get]: (state) => {
            return ({
                ...state,
              })
        },
        [product.retrieveProductItem]: (state, { payload, }) => {

            /*
                This code needs to be written a bit efficient with less line of code as the purpose is to
                change data on different object within an array of array

            */
            
            const { products, } = state;
            const { lineIdx , i, name,} = payload;
            const productsWithoutLine = remove(lineIdx, 1, products);
            const specifiedLine = products[lineIdx];
            const searchedElement = specifiedLine.find((e, idx) => {
                return i === idx
            });
            const mutatedElement = {...searchedElement, nrItems: searchedElement.nrItems-1, };
            const { price, } = searchedElement;
            const { totalSumProducts, } = state;
            const specifiedLineWihoutProduct = remove(i, 1, specifiedLine);
            const updatedLine = insert(i, mutatedElement, specifiedLineWihoutProduct);
            const updatedProductsWithMutatedLine = insert(lineIdx, updatedLine, productsWithoutLine);
            const newState = {
                products: updatedProductsWithMutatedLine,
                totalSumProducts: totalSumProducts + price, 
                pickedProduct: name
            }

            return Object.assign({}, state, newState);
        },
        [product.notEnoughCredit]: (state) => {
            return ({
                ...state,
                notEnoughCredit: true,
                stopRenderNoEnoughMoney: false,
              })
        },
        [product.reset]: (state) => {
            const { products, } = INITIAL_STATE;
            return ({
                ...state,
                totalSumProducts: 0,
                notEnoughCredit: false,
                disableKeypad: true,
                remainingCredit: null,
                pickedProduct: null,
                products
              })
        },
        [credit.enableKeypad]: (state) => {
            return ({
                ...state,
                disableKeypad: false,
              })
        },
        [product.remainingCredit]: (state, { payload, }) => {
            return ({
                ...state,
                remainingCredit: payload,
              })
        },
        [product.stopRenderNoEnoughMoney]: (state, { payload, }) => {
            return ({
                ...state,
                stopRenderNoEnoughMoney: true,
              })
        },
        [product.getAwayPickedProductMsg]: (state) => {
            return ({
                ...state,
                pickedProduct: null,
              })
        },
        [product.noMoreItems]: (state) => {
            return ({
                ...state,
                noItemsAnymore: true,
              })
        },
        [product.removeNoMoreItemsMsg]: (state) => {
            return ({
                ...state,
                noItemsAnymore: false,
              })
        },
    },
    INITIAL_STATE,
);
