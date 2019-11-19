import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Row, Card, Col, Typography, Button, Icon } from 'antd';
import './index.css';
import CustomMenu from './Menu';
import Pic from './assets/960x0.jpg';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Main from './Main';
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render((
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/main" component={Main} />
        </div>
    </Router>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
