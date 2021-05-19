import React, { FunctionComponent, useEffect, useState } from 'react';
import Navbar from './components/navbar/navbar';
import Axios from 'axios';
import LRU from 'lru-cache';
import { configure } from 'axios-hooks';
import Routers from './components/routers/routers';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Authorization from './components/authorization/authorization';
import { config } from 'node:process';
import Dashboard from './components/dashboard/dashboard';

const axios = Axios.create({
  baseURL: 'http://localhost:8085/api',
});

axios.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers = {
        authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  error => Promise.reject(error),
);

const cache = new LRU({ max: 10 });

configure({ axios, cache });

const App: React.FC = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/authorization" component={Authorization} />
        <Route
          path="/"
          component={() => (!!window.localStorage.getItem('token') ? <Navbar /> : <Redirect to="/authorization" />)}
        ></Route>
        <Navbar />
      </Switch>
    </div>
  );
};

export default App;
