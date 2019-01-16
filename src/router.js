import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Routing from './components/Routing/Routing';
import Map from './components/Map/Map'

export default (
  <Switch>
    <Route exact path='/' component={Login}/>
    <Route path='/register' component={Register}/>
    <Route path='/admin/routing' component={Routing}/>
    <Route path='/map' component={Map}/>
  </Switch>
)