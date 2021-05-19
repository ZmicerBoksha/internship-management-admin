import React, { FunctionComponent, useEffect, useState } from 'react';
import Navbar from './components/navbar/navbar';
import './service/axios';
import Routers from './components/routers/routers';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Authorization from './components/authorization/authorization';
import { config } from 'node:process';
import Dashboard from './components/dashboard/dashboard';

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
