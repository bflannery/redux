import expect from 'expect';
import deepFreeze from 'deep-freeze';
import React from 'react';
import ReactDOM from 'react-dom';


//LOWER LEVEL REDUCER FUNCTION: Todo
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if(state.id !== action.id) {
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
  switch(action.type) {
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

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};


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


//APP LEVEL COMBINE REDUCERS FROM REDUX;
import { combineReducers } from 'redux';
const todoApp = combineReducers({
  todos,
  visibilityFilter
});



//APP LEVEL REDUCER FUNCTION
// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   };
// };

import { createStore } from 'redux';
const store = createStore(todoApp);

import { Component } from 'react';


let nextTodoId = 0;

class TodoApp extends Component {
  render() {
    return (
      <div>
        <input ref={node => {
          this.input = node;
        }} />
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,
            id: nextTodoId++
          });
          this.input.value = '';
        }}>
          Add Todo
        </button>
      <ul>
        {this.props.todos.map(todo =>
        <li key={todo.id}>
          {todo.text}
        </li>
        )}
      </ul>
    </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp todos={store.getState().todos}/>,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
