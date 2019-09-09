import React from 'react';
import Coin from './Coin';
import { Wrapper, } from './style';


const AddCredit = () => {
    return <Wrapper>
        {
            ['5','10', '20', '30', '50'].map((v, i) => (<div key={i}>
        <Coin idx={i} coinValue={v}/>
    </div>))
        }
    </Wrapper>
};

export default AddCredit;