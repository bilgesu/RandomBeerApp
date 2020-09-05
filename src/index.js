import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import createHistory from 'history/createBrowserHistory'
import * as serviceWorker from './serviceWorker';
import {Route, Router} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "./configure-store";
import Routes from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';

const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

ReactDOM.render(
    <Provider store={store}>
    <Router history={history}>
        <Routes />
    </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
