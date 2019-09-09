import styled, { css, } from 'styled-components'

export const Container = styled.div`
    display: flex;
    width: 140px;
    justify-content: space-between;
    flex-direction: row;
    margin-top: 60px;
    transform: scale(2.5);
    margin-left: 150px;
`;

const enableKeyPadStyle = css`
    opacity: 1;
    pointer-events: auto;
    background: initial;
`;

export const KeyPadNr = styled.button`
    border: 1px solid;
    flex: 1;
    text-align: center;
    background: green;
`;

export const Key = styled.div`
    flex: 1;
`;

export const Letters = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1px;
`;

export const PadNumbers = styled.div``;
export const OneLineStyle = styled.div`
    opacity: 0.5;
    pointer-events: none;
    background: #CCC;
    ${(props) => {
        const { categoryApicker, categoryBpicker, categoryCpicker, categoryDpicker, } = props.state.stateValue;
        const { idx, } = props.state;
        return (categoryApicker === true && idx ===0 || categoryBpicker === true && idx === 1 
            || categoryCpicker === true && idx ===2 || categoryDpicker === true && idx === 3) && enableKeyPadStyle;
    }};
    ${(props) => {
        return props.disableKeypad && css`
        opacity: 0.5;
        pointer-events: none;
        background: #CCC;
    `
    }}
`;

export const KeypadLetters = styled.button`
  margin-top': 2px,
  marginBottom': 1px,
  opacity: 0.5;
  pointer-events: none;
  background: #CCC;
  margin-bottom: 1px;
  ${(props) => props.enable && enableKeyPadStyle}   
}}
`;
