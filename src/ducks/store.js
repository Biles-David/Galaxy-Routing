import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from 'redux-promise-middleware';

import userReducer from './reducers/userReducer';
import routeReducer from './reducers/routeReducer';

const combinedReducers = combineReducers({
  user: userReducer,
  route: routeReducer
});

export default createStore( combinedReducers, applyMiddleware(promiseMiddleware()));