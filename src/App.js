import React from 'react';
import { Container, } from './style.js'
import Keypad from './components/Keypad/index';
import Products from './components/Products/index';
import AddCredit from './components/EnterMoney/AddCredit';


const App = () => (
  <Container>
    <Keypad />
    <Products />
    <AddCredit />
</Container>)

export default App;
 