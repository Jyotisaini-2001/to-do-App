// src/redux/reducers/index.js

import { combineReducers } from 'redux';
import taskReducer from './taskReducer';

const rootReducer = combineReducers({
  tasks: taskReducer,
  // Add other reducers if any
});

export default rootReducer;
