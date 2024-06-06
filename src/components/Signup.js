// SignUp.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../redux/actions/authActions';
import '../style/form.css';
import { Link } from 'react-router-dom'; 
import { SIGN_UP } from '../redux/authActionTypes'; 

const SignUp = () => {
  const [userData, setUserData] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(state => state.auth.users);
  const error = useSelector(state => state.auth.error);

  const handleSignUp = (e) => {
    e.preventDefault();
    const existingUser = users.find(user => user.username === userData.username);
    if (existingUser) {
      dispatch({ type: SIGN_UP, payload: { error: 'Username already exists' } }); 
    } else {
      dispatch(signUp(userData));
      navigate('/login');
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form className="form" onSubmit={handleSignUp}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={userData.username} 
            onChange={handleChange} 
            placeholder="Enter your username" 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={userData.password} 
            onChange={handleChange} 
            placeholder="Enter your password" 
            required 
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn-submit">Sign Up</button>
      </form>
      <p className="redirect-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default SignUp;
