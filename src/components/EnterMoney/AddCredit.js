import React from 'react';
import Coin from './Coin';
import { Wrapper, } from './style';

const coinList = ['5','10', '20', '30', '50'];
const AddCredit = () => {
    return <Wrapper>
        {
            coinList.map((v, i) => (<div key={i}>
        <Coin idx={i} coinValue={v}/>
    </div>))
        }
    </Wrapper>
};

export default AddCredit;
