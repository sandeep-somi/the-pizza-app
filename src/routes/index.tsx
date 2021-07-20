import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import User from '../containers/user';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={User} />
      </Switch>
    </Router>
  )
}