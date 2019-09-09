import { createActions, } from 'redux-actions';

export default createActions({
    PRODUCT: {
        REQUEST_PRODUCT: null,
        SEARCH: null,
        RETRIEVE_PRODUCT_ITEM: null,
        NO_MORE_ITEMS: null,
        NOT_ENOUGH_CREDIT: null,
        REMAINING_CREDIT: null,
        RESET: null,
        STOP_RENDER_NO_ENOUGH_MONEY: null,
        RESET_RENDER_NO_ENOUGH_MONEY_VAR: null,
        RESET_NOT_ENOUGH_MONEY_MSG: null,
        GET_AWAY_PICKED_PRODUCT_MSG: null,
        REMOVE_NO_MORE_ITEMS_MSG: null,
        
    }
});
