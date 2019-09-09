import React, { useEffect, } from 'react';
import { connect, } from 'react-redux';
import { array, bool, func, string, } from 'prop-types';
import { applySpec, } from 'ramda';
import Product from './product';
import addCreditActions from '../../store/actions/addCredit';
import productActions from '../../store/actions/getProducts';
import { productsSelector,
         notEnoughCreditSelector, 
         remaininCreditSelector, 
          stopRenderNoMoneyMsgSelector,
          pickedProductNameSelector,
          noMoreItemSelector,
} from '../../store/selectors/keypad';
import { LineProducts, Wrapper, Notification, ErrorNotification, NoMoreItems, RemainingMoney, PickedProduct, } from './style';

const renderItems = (items) => {
    return (<Wrapper>
        {items.map((line, letterType) => {
            return (<LineProducts>
                {
                    line.map((elem, idx) => {
                        return <Product 
                                    letterType={letterType}
                                    nrItems={elem.nrItems}
                                    price={elem.price}
                                    idx={idx}
                                    productName={elem.name} 
                                />
                    })
                }
            </LineProducts>)
        })}
    </Wrapper>)
}

const removeNotEnoughMoneyMsg = (stopRenderNMMmsg, notEnoughCredit) => {
    if (stopRenderNMMmsg) { 
        return ''
    } else {
        return (<div>
            {notEnoughCredit && <ErrorNotification>You have not enough money to get new product</ErrorNotification>}
        </div>)
    }
}


const Products = ({ products, 
                    notEnoughCredit,
                    remaininCredit, 
                    getCreditBack, 
                    pickedProductName, 
                    removePickProductmsg, 
                    stopRenderNMMmsg, 
                    noItemsAnymore }) => {
      useEffect(() => {
        const timer = setTimeout(() => removePickProductmsg(), 1000);
        return () => clearTimeout(timer);
      }, [pickedProductName]);

    return (
    <div>
        {renderItems(products)}
            <Notification>
                {remaininCredit && <RemainingMoney>Remaining credit is {remaininCredit}$</RemainingMoney>}
                {noItemsAnymore && <NoMoreItems>No more items</NoMoreItems>}
                {removeNotEnoughMoneyMsg(stopRenderNMMmsg, notEnoughCredit)}
                {remaininCredit && <button onClick={() => getCreditBack()}>Get your remaing money back</button>}
                {pickedProductName && <PickedProduct>Great mate, you picked {pickedProductName}</PickedProduct>}
            </Notification>
    </div> 
    )
}

const mapStateTopProps = applySpec({
    products: productsSelector,
    notEnoughCredit: notEnoughCreditSelector,
    remaininCredit: remaininCreditSelector,
    stopRenderNMMmsg: stopRenderNoMoneyMsgSelector,
    pickedProductName: pickedProductNameSelector,
    noItemsAnymore: noMoreItemSelector,
});

const mapDispatchToProps = {
    getCreditBack: addCreditActions.credit.getCreditBack,
    resetNemMsg: productActions.product.getAwayPickedProductMsg,
    removePickProductmsg: productActions.product.getAwayPickedProductMsg, 
};

Products.propTypes = {
    products: array,
    notEnoughCredit: bool,
    remaininCredit: bool,
    getCreditBack: func,
    pickedProductName: string,
    removePickProductmsg: func,
    stopRenderNMMmsg: bool,
    noItemsAnymore: bool,
  };

export default connect(mapStateTopProps, mapDispatchToProps)(Products);
