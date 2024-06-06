// // store.js

// import { createStore, combineReducers } from 'redux';
// import taskReducer from './reducers/taskReducer';

// // Define a root reducer combining all reducers
// const rootReducer = combineReducers({
//   tasks: taskReducer,
//   // Add other reducers here if needed
// });

// // Load tasks from local storage when the Redux store initializes
// const persistedTasks = localStorage.getItem('tasks');
// const initialState = {
//   tasks: persistedTasks ? JSON.parse(persistedTasks) : [],
// };

// // Create the Redux store with the root reducer and initial state
// const store = createStore(rootReducer, initialState);

// // Subscribe to store changes and update local storage whenever tasks state changes
// store.subscribe(() => {
//   const { tasks } = store.getState();
//   localStorage.setItem('tasks', JSON.stringify(tasks));
// });

// export default store;
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'
import taskReducer from './reducers/taskReducer';
import weatherReducer from './reducers/weatherReducer'; // Import the new weather reducer
import authReducer from './reducers/authReducer';

// Define a root reducer combining all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,
  weather: weatherReducer, // Include the new weather reducer
  // Add other reducers here if needed
});

// Load tasks from local storage when the Redux store initializes
const persistedTasks = localStorage.getItem('tasks');
const initialState = {
  tasks: persistedTasks ? JSON.parse(persistedTasks) : [],
};

// Create the Redux store with the root reducer, initial state, and thunk middleware
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

// Subscribe to store changes and update local storage whenever tasks state changes
store.subscribe(() => {
  const { tasks } = store.getState();
  localStorage.setItem('tasks', JSON.stringify(tasks));
});

export default store;
