import {
    path, pathOr, propOr, prop,
} from 'ramda';

export const enableKeyPadLetterSelector = path([ 'addCredit', 'enableKeypad', ]);
export const totalCreditSelector = path([ 'addCredit', 'totalCredit', ]);
export const productsSelector = path([ 'productsStore', 'products', ]);
export const totalSumProductSelector = path([ 'productsStore', 'totalSumProducts', ]);
export const notEnoughCreditSelector = path([ 'productsStore', 'notEnoughCredit', ]);
export const disableKeypadSelector = path([ 'productsStore', 'disableKeypad', ]);
export const remaininCreditSelector = path([ 'productsStore', 'remainingCredit', ]);
export const stopRenderNoMoneyMsgSelector = path([ 'productsStore', 'stopRenderNoEnoughMoney', ]);
export const pickedProductNameSelector = path([ 'productsStore', 'pickedProduct', ]);
export const noMoreItemSelector = path([ 'productsStore', 'noItemsAnymore', ]);
// noItemsAnymore