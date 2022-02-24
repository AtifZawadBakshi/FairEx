import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as Helper from '../src/components/Utility/Helper';
import axios from "axios";
import {URL} from '../src/axios/Api';

const user = Helper.authUser;
axios.defaults.baseURL = URL;
if(user != null){
  let token = Helper.authUser.access_token;
  axios.defaults.headers.common = {
    'Authorization': `Bearer ${token}`,
    'Accept' : 'application/json'
  }  
}

// 401 error handling
// axios.interceptors.response.use(response => {
//     return response;
// },  error => {
// if (error.response.status === 401) {
//     localStorage.removeItem('user');
//     window.location.href = "/login";
// }
//     return error;
// });


if(user != null){
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('main-wrapper')
  );
}else {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('login-wrapper')
    );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
