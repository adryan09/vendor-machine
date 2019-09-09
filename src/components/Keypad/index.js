import React, { useReducer,} from 'react';
import { bool, func, } from 'prop-types';
import { connect, } from 'react-redux';
import { splitAt, compose, applySpec,  } from 'ramda';
import { Container, KeyPadNr, Letters, OneLineStyle, PadNumbers, KeypadLetters,  } from './style.js';
import { enableKeyPadLetterSelector, disableKeypadSelector, } from '../../store/selectors/keypad';
import productActions from '../../store/actions/getProducts';


const NUMBER_OF_COLUMNS = 5;

const startFromIndex = (idx, arr) => splitAt(idx, arr);
const mapingObj = {
    categoryApicker: 'A',
    categoryBpicker: 'B',
    categoryCpicker: 'C',
    categoryDpicker: 'D',
}

const oneLine = (columns, stateVal, searchProduct) => columns.map((__, idx) => {
    return (<KeyPadNr key={idx} onClick={() => {
        const { categoryApicker, categoryBpicker, categoryCpicker, categoryDpicker } = stateVal;
        let letterType = null;
        if (categoryApicker) {
            letterType = 'A'
        } 
        if (categoryBpicker) {
            letterType = 'B'
        }

        if (categoryCpicker) {
            letterType = 'C'
        }

        if (categoryDpicker) {
            letterType = 'D'
        }
        return searchProduct({letterType, idx});
    }}>
        {idx}
    </KeyPadNr>)
})

export const renderOnelLine = (stateValue, searchProduct) => {
    const columns = startFromIndex(1, [...Array(NUMBER_OF_COLUMNS)])[1];
    const oL = oneLine(columns, stateValue, searchProduct);
    return oL;
}

const padNumbers = (state) => {
    const { stateValue, searchProduct, disableKeypad } = state;
    return [...new Array(4).keys()].map((__,idx) => (
        <OneLineStyle 
            disableKeypad={disableKeypad}
            state={{stateValue, idx}}
            key={idx}>{renderOnelLine(stateValue, searchProduct)}
        </OneLineStyle>
        )
    )
}

const keyPadLetters = (dispatch, keypadLetterEnabler, stateValue) => [ 'A','B','C', 'D', ].map((currElement, idx) => <KeypadLetters 
key={idx} enable={keypadLetterEnabler} disable={stateValue} onClick={() => dispatch({ type: currElement })}>{currElement}</KeypadLetters>)

const initialStateValues = {
  categoryApicker: false,
  categoryBpicker: false,
  categoryCpicker: false,
  categoryDpicker: false,
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'A': 
            return {...state, categoryApicker: true, categoryBpicker: false,  categoryCpicker: false, categoryDpicker: false, };
        case 'B': 
            return {...state, categoryBpicker: true, categoryApicker: false, categoryCpicker: false, categoryDpicker: false, }; 
        case 'C':
            return {...state, categoryCpicker: true, categoryApicker: false, categoryBpicker: false, categoryDpicker: false, };
        case 'D':
            return {...state, categoryDpicker: true, categoryApicker: false, categoryBpicker: false, categoryCpicker: false, };
        default: 
            return state;
    }
};

const Keypad = ({ keypadLetterEnabler,searchProduct, disableKeypad, }) => {
    const [stateValue, dispatch] = useReducer(reducer, initialStateValues);
    return (
        <Container>
            <Letters>
               {keyPadLetters(dispatch, keypadLetterEnabler, stateValue)}
            </Letters>
            <PadNumbers>
               {padNumbers({stateValue, searchProduct, disableKeypad})}
            </PadNumbers>
        </Container>
    );
}
const mapStateTopProps = applySpec({
    keypadLetterEnabler: enableKeyPadLetterSelector,
    disableKeypad: disableKeypadSelector,
})

const mapDispatchToProps = {
    searchProduct: productActions.product.requestProduct,
}

Keypad.propTypes = {
    keypadLetterEnabler: bool,
    searchProduct: func,
    disableKeypad: bool,
  };

export default connect(mapStateTopProps, mapDispatchToProps)(Keypad);