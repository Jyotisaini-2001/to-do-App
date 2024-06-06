// authActions.js

import { SIGN_UP, LOGIN, LOGOUT } from '../authActionTypes';

export const signUp = (userData) => ({
  type: SIGN_UP,
  payload: userData,
});

export const login = (credentials) => ({
    type: LOGIN,
    payload: credentials,
  });
export const logout = () => ({
  type: LOGOUT,
});

