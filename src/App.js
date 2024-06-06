import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import store from '../src/redux/store'; 
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import { Navigate } from 'react-router-dom'; // Import Navigate from react-router-dom

function App() {
  return (
        <div className="App">
          <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>} />
          </Routes>
        </div>
  );
}

export default App;
