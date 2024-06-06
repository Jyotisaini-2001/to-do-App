// src/redux/reducers/index.js

import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import weatherReducer from './weatherReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  auth: authReducer,

  tasks: taskReducer,
  weather: weatherReducer, 
  // Add other reducers if any
});

export default rootReducer;
