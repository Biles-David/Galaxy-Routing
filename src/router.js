import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

export default (
  <Switch>
    <Route exact path='/' component={Login}/>
    <Route path='/register' component={Register}/>
  </Switch>
)