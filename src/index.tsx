import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.scss';
import * as serviceWorker from './serviceWorker';
import App from './App';
import HomePage from './pages/Home';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import ProjectManagementPage from './pages/ProjectManagement';

import reducers from './reducers';

const middleware = [thunk];

ReactDOM.render(
  <Provider store={createStore(reducers, applyMiddleware(...middleware))}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={HomePage} />
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
