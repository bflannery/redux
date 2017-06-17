import expect from 'expect';
import deepFreeze from 'deep-freeze';



//ADD COUNTER FUNCTION
const addCounter = (list) => {
  return [...list, 0];
};


//REMOVE COUNTER FUNCTION
const removeCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ];
};


const incrementCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1)
  ];
};



//TESTS

//TEST ADD COUNTER FUNCTION
const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];

  deepFreeze(listBefore);

  expect(
    addCounter(listBefore)
  ).toEqual(listAfter);
};

//TEST REMOVE COUNTER FUNCTION
const testRemoveCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  deepFreeze(listBefore);

  expect(
    removeCounter(listBefore, 1)
  ).toEqual(listAfter);
};

const testIncrementCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];

  deepFreeze(listBefore);

  expect(
    incrementCounter(listBefore, 1)
  ).toEqual(listAfter);
};



//CALL TEST FUNCTIONS
testAddCounter();
testRemoveCounter();
console.log('All tests passed');
