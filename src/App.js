import React from 'react';
import logo from './logo.svg';
import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";
import './App.css';

import indexRoutes from './Routes'

const hist = createBrowserHistory();

const App = () => {
  return (
    <Router history={hist}>
      <Switch>
        {indexRoutes().map((prop, key) => (
          <Route path={prop.path} component={prop.component} key={key} />
        ))}
      </Switch>
    </Router>
  );
};

export default App;



