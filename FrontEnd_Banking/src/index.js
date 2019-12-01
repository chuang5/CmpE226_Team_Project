import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Row, Card, Col, Typography, Button, Icon } from 'antd';
import './index.css';
import CustomMenu from './Menu';
import Pic from './assets/960x0.jpg';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Entry from "./Entry";
import Main from './Main';
import CustomerDetail from "./CustomerDetail_1";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

ReactDOM.render((
    <Entry/>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
