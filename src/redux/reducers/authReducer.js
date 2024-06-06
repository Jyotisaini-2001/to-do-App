// authReducer.js

import { SIGN_UP, LOGIN, LOGOUT } from '../authActionTypes';

// Get user data from local storage or initialize an empty array
const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

const initialState = {
  users: storedUsers,
  currentUser: null, // Initialize current user as null
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      const newUser = action.payload;
      const userExists = state.users.some(user => user.username === newUser.username);
      
      if (userExists) {
        return {
          ...state,
          error: 'User already exists',
        };
      } else {
        const updatedUsers = [...state.users, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers)); // Update local storage
        return {
          ...state,
          users: updatedUsers,
          error: null,
        };
      }
    case LOGIN:
      const { username, password } = action.payload;
      const user = state.users.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        return { ...state, currentUser: user, error: null };
      } else {
        return { ...state, error: 'Invalid username or password' };
      }
      case LOGOUT:
        return { ...state, currentUser: null, error: null };
    default:
      return state;
  }
};

export default authReducer;
