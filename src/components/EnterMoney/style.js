import styled, { css, } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 400px;
  margin-left: 20px;
  margin-top: 20px;
`;

export const CoinStyle = styled.button`
  ${(props) => !props.compareValue && css`
    opacity: 1;
    pointer-events: auto;
    background: initial;
    width: 55px; 
    height: 55px;
    background: green linear-gradient(55deg,green, yellow);
 `}
 ${(props) => {
    if (props.compareValue) {
      const { coinValue, totalCredit } = props;
      const rest = 50 - totalCredit;
      if (rest < coinValue) {
        return css`
        opacity: 0.5;
        pointer-events: none;
        background: radial-gradient(white,green);
        width: 55px; 
        height: 55px;
        `
      } else {
        return css`
        opacity: 1;
        pointer-events: auto;
        background: initial;
        width: 55px; 
        height: 55px;
        background: green linear-gradient(55deg,green, yellow);
        `
      }
    }
  }
  }
`;
