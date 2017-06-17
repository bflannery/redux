import React from 'react';
import { connect } from 'react-redux';
import TodoList from './TodoList';


//Toggle Todo Method
const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
};

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

export default connect(mapStateToTodoListProps,mapDispatchToTodoListProps)(TodoList);



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
