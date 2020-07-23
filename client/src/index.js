import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'tachyons';
import { BrowserRouter as Router } from 'react-router-dom'; 
import axios from 'axios'


axios.get(`${process.env.REACT_APP_API_URL}/api/checkuser`, {withCredentials: true})
.then(res => {
  ReactDOM.render(
    <Router><App user={res.data} /></Router>, document.getElementById('root'));
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

