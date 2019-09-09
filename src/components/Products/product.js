import React from 'react';

const Product = ({ productName, nrItems, price, }) => {
    return (<div style={{
        'fontWeight': '600',
        'fontSize': '13px'
    }}> 
        <div>total nr: <span style={{
            'color': 'yellow',
            'fontSize': '15px'
        }}>{nrItems}</span></div>
        <div style={{
            'color': 'aliceblue',
        }}>{productName}</div>
        <div style={{
        }}>price {price}</div>
    </div>)
}

export default Product;
