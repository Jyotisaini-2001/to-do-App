// store.js

import { createStore, combineReducers } from 'redux';
import taskReducer from './reducers/taskReducer';

// Define a root reducer combining all reducers
const rootReducer = combineReducers({
  tasks: taskReducer,
  // Add other reducers here if needed
});

// Load tasks from local storage when the Redux store initializes
const persistedTasks = localStorage.getItem('tasks');
const initialState = {
  tasks: persistedTasks ? JSON.parse(persistedTasks) : [],
};

// Create the Redux store with the root reducer and initial state
const store = createStore(rootReducer, initialState);

// Subscribe to store changes and update local storage whenever tasks state changes
store.subscribe(() => {
  const { tasks } = store.getState();
  localStorage.setItem('tasks', JSON.stringify(tasks));
});

export default store;
