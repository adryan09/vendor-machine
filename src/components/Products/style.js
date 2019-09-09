import styled, { css, } from 'styled-components';

export const LineProducts = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px
`;
export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 400px;
    margin-top: 100px;
    margin-left: 20px
    flex-direction: column;
    font-size: 14px;
    background: cornflowerblue;
`;

export const Notification = styled.div`
    margin-left: 20px;
    width: 400px;
    border: 0px solid red;
    text-align: center;
    font-size: 20px;
`;

export const ErrorNotification = styled.div`
    color: red;
    font-weight: 600;
    text-align: center
`

export const NoMoreItems = styled(ErrorNotification)`
    font-weight: 800;
`;

export const RemainingMoney = styled.div`
    color: green;
    font-weight: 600;
    text-align: center;
`;

export const PickedProduct = styled.div`
    font-weight: 800;
    color: blue;
`;
