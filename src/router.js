import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Routing from './components/Routing/Routing';
import RouteList from './components/RouteList/RouteList';

export default (
  <Switch>
    <Route path='/admin/routing/:id' component={Routing}/>
    <Route path='/admin/routing' component={RouteList}/>
    <Route path='/register' component={Register}/>
    <Route exact path='/' component={Login}/>
  </Switch>
)