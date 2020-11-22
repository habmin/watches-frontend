import './App'
import { createStore, combineReducers } from 'redux'
import { Cart, Product, CheckoutButton } from "react-shopping-cart";
import { configureStore, createAction, createReducer } from '@reduxjs/toolkit'
import React, { createContext, PureComponent, useReducer } from 'react';


const store = configureStore({ reducer: counterReducer })

// ACTIONS
const addToCart = product => {
  return {
    type: 'addItemToCart',
    payload: product
  }
}
const removingItemFromCart = item => {
  return {
    type: 'removingItemFromCart',
    payload: product
  }
}
const clearingAllItems = item => {
  return {
    type: 'removingAllFromCart',
    payload: product
  }
}
const checkOut = item => {
  return {
    type: 'checkoutItems',
    payload: product
  }
}






interface CounterState {
  value: number
}

const add = createAction('addItemToCart')
const remove = createAction('removingItemFromCart')
const clear = createAction('addItemToCart')
const balance = createAction<number>('addingBalance')

const initialState: CounterState = { value: 0 }

const counterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(add, (state, action) => {
      state.value++
    })
    .addCase(remove, (state, action) => {
      state.value--
    })
    .addCase(balance, (state, action) => {
      state.value += action.payload
    })
    .addCase(clear, (state, action) => {
      state.value -= state.value
    })
})







let store = createStore(counterReducer)



store.subscribe(() => console.log(store.getState()))


store.dispatch({ type: 'addItemToCart'})

store.dispatch({ type: 'removingItemFromCart'})

store.dispatch({ type: 'addingBalance'})

store.dispatch({ type: 'clearingCart'})

// store.dispatch({ type: 'checkoutItems'})



console.log(store.getState())












//
// //replace method with one above reducer
// function counterReducer(state = initialState, action) {
//   switch (action.type) {
//     case 'addItemToCart':
//       return { ...state, value: state.value + 1 }
//     case 'removingItemFromCart':
//       return { ...state, value: state.value - 1 }
//     case 'addingBalance':
//       return { ...state, value: state.value + action.payload }
//     case 'clearingCart':
//       return { ...state, value: state.value - state.value }
//
//     default:
//       return state
//   }
// }

export default ShoppingCart;
