import expect from 'expect';
import deepFreeze from 'deep-freeze';
import React from 'react';
import ReactDOM from 'react-dom';



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

const visibilityFilter = (state = 'SHOW_ALL', action) => {
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

import {combineReducers} from 'redux';
//APP LEVEL COMBINE REDUCERS FROM REDUX;
const todoApp = combineReducers({todos, visibilityFilter});

//APP LEVEL REDUCER FUNCTION
// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   };
// };


let nextTodoId = 0;

const addTodo = (text) => {
  return {
      type: 'ADD_TODO',
      id: nextTodoId++,
      text
  };
};

const setVisibilityFilter = (filter) => {
  return {
      type: 'SET_VISIBILITY_FILTER',
      filter
  };
};

const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
};

import { Component } from 'react';
import { Provider, connect } from 'react-redux';
//FilterLink Function
const Link = ({active, children, onClick}) => {
  if (active) {
    return <span> {children} </span>
  }
  return (
    <a href='#' onClick={e => {
      e.preventDefault();
      onClick();
    }}>
      {children}
    </a>
  );
};


//Todo Function Component
const Todo = ({onClick, completed, text}) => (
  <li onClick={onClick} style={{
    textDecoration: completed
      ? 'line-through'
      : 'none'
  }}>
    {text}
  </li>
);

//TodoList Function Component
const TodoList = ({todos, onTodoClick}) => (
  <ul>
    {todos.map(todo => <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)}/>)}
  </ul>
)



//AddTodo Function Component
let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }}/>
      <button onClick={() => {
        store.dispatch(addTodo(input.value));
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
};
AddTodo = connect()(AddTodo);



const mapStateToLinkProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  };
};

const mapDisptchToLinkProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  };
}
const FilterLink = connect(
  mapStateToLinkProps,
  mapDisptchToLinkProps
)(Link);


//Footer Function Component
const Footer = () => (
  <p> Show:
    { ' ' }
    <FilterLink filter='SHOW_ALL'> All </FilterLink>
    { ' ' }
    <FilterLink filter = 'SHOW_ACTIVE'> Active </FilterLink>
    { ' ' }
    <FilterLink filter = 'SHOW_COMPLETED'> Completed </FilterLink>
    { ' ' }
  </p>
)

//getVisibleTodos Function Component
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
  }
}



//Takes State of Store and returns props as 'todos'
const mapStateToTodoListProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  };
};

//Takes Dispatch and return props for 'onTodoClick'
const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: (id) =>
      dispatch(toggleTodo(id))
    }
  };
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);

// //VISIBLETODOLIST CLASS COMPONENT
// class VisibleTodoList extends Component {
//   componentDidMount() {
//     const { store } = this.context;
//     this.unsubscribe = store.subscribe(() =>
//       this.forceUpdate()
//     );
//   }
//
//   componentWillUnmount() {
//     this.unsubscribe();
//   }
//
//   render() {
//     const props = this.props;
//     const { store } = this.context;
//     const state = store.getState();
//
//     return (
//       <TodoList
//         todos={
//
//         }
//         onTodoClick={
//         }
//       />
//     );
//   }
// }
// VisibleTodoList.contextTypes = {
//   store: React.PropTypes.object
// };

//TodoApp Class Component
const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);


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

import { createStore } from 'redux';


ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);
