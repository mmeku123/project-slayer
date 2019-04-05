import 'bootstrap/dist/css/bootstrap.css';

import 'antd/dist/antd.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore'; // make sure you add this for firestore

import './index.scss';
import * as serviceWorker from './serviceWorker';
import App from './App';
import HomePage from './pages/Home';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import ProjectManagementPage from './pages/ProjectManagement';
import LogOut from './components/LogOut';

import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(thunk));

const isAuth = store.getState().auth.isAuth;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={HomePage} />
        <Route path="/logout" component={LogOut} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/project" component={ProjectManagementPage} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
