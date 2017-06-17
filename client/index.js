import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers  } from 'redux';
import { Provider } from 'react-redux';


import TodoApp from './components/TodoApp';



//LOWER LEVEL REDUCER FUNCTION: Todo
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {id: action.id, text: action.text, completed: false};
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
}

//TOP-LEVEL REDUCER FUNCTION: Todos
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

//TOP-LEVEL REDUCER FUNCTION: visibilityFilter
const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};


//APP LEVEL COMBINE REDUCERS FROM REDUX;
const todoApp = combineReducers({todos, visibilityFilter});

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);





//
// //COMBINE REDUCER () fROM SCRATCH
// const combineReducers = (reducers) => {
//   return (state = {}, action) => {
//     return Object.keys(reducers).reduce(
//       (nextState, key) => {
//         nextState[key] = reducers[key](
//           state[key],
//           action
//         );
//         return nextState;
//       },
//       {}
//     )
//   };
// };


//APP LEVEL REDUCER FUNCTION
// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   };
// };



// class Provider extends Component {
//   getChildContext() {
//     return {
//       store: this.props.store
//     };
//   }
//
//   render() {
//     return this.props.children;
//   }
// }
// Provider.childContextTypes = {
//   store: React.PropTypes.object
// };
