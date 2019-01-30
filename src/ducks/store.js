import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from 'redux-promise-middleware';

import userReducer from './reducers/userReducer';
import routeReducer from './reducers/routeReducer';
import listReducer from './reducers/listReducer';

const combinedReducers = combineReducers({
  user: userReducer,
  route: routeReducer,
  list: listReducer
});

export default createStore( combinedReducers, applyMiddleware(promiseMiddleware()));