import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import { createStore } from 'redux';


//REDUCER
const counter = (state = 0, action) => {
   switch (action.type) {
     case 'INCREMENT':
        return state + 1;
     case 'DECREMENT':
        return state - 1;
     default:
        return state;
   }
}

//REACT COUNTER COMPONENT
const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
    <h1> {value} </h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);


//REDUX STORE
const store = createStore(counter);


///REACT RENDER FUNCTION
//PASS COUNTER COMPONENT WITH STATE
const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() =>
        store.dispatch({
          type: 'INCREMENT'
        })
      }
      onDecrement={() =>
        store.dispatch({
          type: 'DECREMENT'
        })
      }
    />,
    document.getElementById('root')
  );
};

//SUBSCRIBE TO CHANGES ON THE RENDER FUNCTION
store.subscribe(render);
render();

//
// expect(
//   counter(0, { type: 'INCREMENT'})
// ).toEqual(1);
//
// expect(
//   counter(1, { type: 'INCREMENT'})
// ).toEqual(2);
//
// expect(
//   counter(2, { type: 'DECREMENT'})
// ).toEqual(1);
//
// expect(
//   counter(1, { type: 'DECREMENT'})
// ).toEqual(0);
//
// expect(
//   counter(1, { type: 'SOMETHING_ELSE' })
// ).toEqual(1);
//
// expect(
//   counter(undefined, {})
// ).toEqual(0);
//
// console.log('Tests passed!');
