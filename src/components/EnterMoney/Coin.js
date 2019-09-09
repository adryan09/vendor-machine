import React, { useEffect, useState, } from 'react';
import { array, bool, func, string, number } from 'prop-types';
import { connect, } from 'react-redux';
import { splitAt, compose, applySpec,  } from 'ramda';
import addCreditActions from '../../store/actions/addCredit';
import { totalCreditSelector, } from '../../store/selectors/keypad';
import { CoinStyle, } from './style';

const Coin = ({ totalCredit, coinValue, addCredit}) => {
    const [enable, setEnable] = useState(false);
    useEffect(() => {
        if (totalCredit) {
            setEnable(true);
        }
    })
    return <CoinStyle 
                compareValue={enable} 
                totalCredit={totalCredit} 
                coinValue={coinValue} 
                onClick={() => addCredit(coinValue)}>
                    {coinValue} $
            </CoinStyle>
}

const mapDispatchToProps = {
    addCredit: addCreditActions.credit.add,
}

const mapStateTopProps = applySpec({
    totalCredit: totalCreditSelector,
})

Coin.propTypes = {
    totalCredit: number,
    coinValue: number,
    addCredit: func,
  };


export default connect(
    mapStateTopProps, 
    mapDispatchToProps
)(Coin);
