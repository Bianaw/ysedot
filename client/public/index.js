import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from '../src/App';
import axios from 'axios';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
axios.get('/api/test')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
