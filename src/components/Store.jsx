import './App'
import { createStore, combineReducers } from 'redux'
import { Cart, Product, CheckoutButton } from "react-shopping-cart";
import { configureStore } from '@reduxjs/toolkit'
import React, { createContext, PureComponent, useReducer } from 'react';
import { CartReducer, sumItems } from './CartReducer';

const store = configureStore({ reducer: counterReducer })


// ACTIONS
const addToCart = item => {
  return {
    type: 'addItemToCart',
    payload: item
  }
}
const removingItemFromCart = item => {
  return {
    type: 'removingItemFromCart',
    payload: item
  }
}
const clearingAllItems = item => {
  return {
    type: 'removingAllFromCart',
    payload: item
  }
}
const checkOut = item => {
  return {
    type: 'checkoutItems',
    payload: item
  }
}

//reducer
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case 'addItemToCart':
      return { value: state.value + 1 }
    case 'removingItemFromCart':
      return { value: state.value - 1 }
    case 'removingAllFromCart':
      return { value: state.value - state.value }

    default:
      return state
  }
}


let store = createStore(counterReducer)



store.subscribe(() => console.log(store.getState()))

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'addItemToCart'})
// {value: 1}
store.dispatch({ type: 'removingItemFromCart'})
// {value: 2}
store.dispatch({ type: 'removingAllFromCart'})
// {value: 3}
store.dispatch({ type: 'checkoutItems'})



console.log(store.getState())






export default ShoppingCart;
