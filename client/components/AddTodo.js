import React from 'react';
import { connect } from 'react-redux';


//Add Todo Method

const addTodo = (text) => {
  return {
      type: 'ADD_TODO',
      id: nextTodoId++,
      text
  };
};

//AddTodo Function Component
let nextTodoId = 0;
let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input ref={node => {input = node; }}/>
      <button onClick={() => { dispatch(addTodo(input.value)); input.value = ''; }}>
        Add Todo
      </button>
    </div>
  );
};

AddTodo = connect()(AddTodo);

export default AddTodo;
