import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Routing from './components/Routing/Routing';
import RouteList from './components/RouteList/RouteList';
import Login from './components/Login/Login';
import UserMain from './components/UserMain/UserMain';
import Checklist from './components/Checklist/Checklist';

export default (
  <Switch>
    <Route path='/admin/routing/:id' component={Routing}/>
    <Route path='/admin/routing' component={RouteList}/>
    <Route path='/checklist' component={Checklist} />
    <Route path='/register' component={Register}/>
    <Route path='/login' component={Login}/>
    <Route path='/user/:id' component={UserMain} />
    <Route exact path='/' component={Home}/>
  </Switch>
)