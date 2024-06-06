// Login.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import '../style/form.css';

const Login = () => {
  const [userData, setUserData] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.auth.currentUser);
  const error = useSelector(state => state.auth.error);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(userData);
    dispatch(login(userData));
  };

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form className="form" onSubmit={handleLogin}>
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
        <button type="submit" className="btn-submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
