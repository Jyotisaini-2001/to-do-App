
import React from 'react';
import { Provider } from 'react-redux'; 
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from '../src/redux/store'; 

function App() {
  return (
    <Provider store={store}> {/* Wrap  components with Provider and pass the Redux store */}
      <div className="App">
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;
