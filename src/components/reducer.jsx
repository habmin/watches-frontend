import React, { createContext, useReducer } from 'react';
import { CartReducer, sumItems } from './CartReducer';

/*combines all reducers*/

rootReducer = combineReducers({potato: counterReducer, tomato: tomatoReducer})
// This would produce the following state object
{
  potato: {
    // ... potatoes, and other state managed by the potatoReducer ...
  },
  tomato: {
    // ... tomatoes, and other state managed by the tomatoReducer, maybe some nice sauce? ...
  }
}









//
//
//
// function counterReducer(state = { value: 0 }, action) {
//   switch (action.type) {
//     case 'addItemToCart':
//       return { value: state.value + 1 }
//     case 'removingItemFromCart':
//       return { value: state.value - 1 }
//     case 'removingAllFromCart':
//       return { value: state.value - state.value }
//
//     default:
//       return state
//   }
// }
//
//
// let store = createStore(counterReducer)
//
//
//
// store.subscribe(() => console.log(store.getState()))
//
// // The only way to mutate the internal state is to dispatch an action.
// // The actions can be serialized, logged or stored and later replayed.
// store.dispatch({ type: 'addItemToCart' })
// // {value: 1}
// store.dispatch({ type: 'removingItemFromCart' })
// // {value: 2}
// store.dispatch({ type: 'removingAllFromCart ' })
// // {value: 3}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// For Redux specifically, we can break these steps into more detail:
//
// Initial setup:
// A Redux store is created using a root reducer function
// The store calls the root reducer once, and saves the return value as its initial state
// When the UI is first rendered, UI components access the current state of the Redux store, and use that data to decide what to render. They also subscribe to any future store updates so they can know if the state has changed.
// Updates:
// Something happens in the app, such as a user clicking a button
// The app code dispatches an action to the Redux store, like dispatch({type: 'counter/increment'})
// The store runs the reducer function again with the previous state and the current action, and saves the return value as the new state
// The store notifies all parts of the UI that are subscribed that the store has been updated
// Each UI component that needs data from the store checks to see if the parts of the state they need have changed.
// Each component that sees its data has changed forces a re-render with the new data, so it can update what's shown on the screen
// Here's what that data flow looks like visually:
//
//
// function Counter() {
//   // State: a counter value
//   const [counter, setCounter] = useState(0)
//
//   // Action: code that causes an update to the state when something happens
//
//   // add items
//   const addItemsToCart = () => {
//     setCounter(prevCounter => prevCounter + 1)
//   }
//   // remove items
//   // clear cart
//   //
//   //
//
//   const increment = () => {
//     setCounter(prevCounter => prevCounter + 1)
//   }
//   // View: the UI definition
//   return (
//     <div>
//       Value: {counter} <button onClick={increment}>Increment</button>
//     </div>
//   )
// }
