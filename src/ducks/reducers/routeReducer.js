import axios from 'axios';

// Action Types
const GET_ROUTE = 'GET_ROUTE';
const GET_ROUTES = 'GET_ROUTES';
const GET_LOCATIONS = 'GET_LOCATIONS';
const ADD_TO_ROUTE = 'ADD_TO_ROUTE';
const CLEAR_ROUTE = 'CLEAR_ROUTE';

// Initial State
const initialState = {
  locations: [],
  allRoutes: [],
  route: [],
  isLoaded: false,
  routesLoaded: false
}

// Action Creators
export function getLocations(){
  return {
    type: GET_LOCATIONS,
    payload: axios('api/locations')
  }
}

export function getRoute(id){
  return{
    type: GET_ROUTE,
    payload: axios.post(`/api/routes/${id}`)
  }
}

export function addToRoute( id, route ){
  return {
    type: ADD_TO_ROUTE,
    payload: axios.post(`/api/route/${id}/add`, route)
  }
}

export function getRoutes(){
  return {
    type: GET_ROUTES,
    payload: axios('/api/routes')
  }
}

export function clearRoute (){
  return {
    type: CLEAR_ROUTE,
    payload: null
  }
}

// Reducer
export default function ( state=initialState, action){
  switch(action.type){
    case `${GET_LOCATIONS}_FULFILLED`:
      return {
        ...state,
        locations: action.payload
      }
    case `${GET_ROUTE}_FULFILLED`:
      return {
        ...state,
        route: action.payload,
        isLoaded: true
      }
    case `${GET_ROUTES}_FULFILLED`:
      return {
        ...state,
        allRoutes: action.payload,
        routesLoaded: true
      }
    case `${ADD_TO_ROUTE}_FULFILLED`:
      return {
        ...state,
        route: action.payload,
      }
    case CLEAR_ROUTE:
      return {
        ...state,
        route: [],
        isLoaded: false
      }
    default:
      return state
  }
}
