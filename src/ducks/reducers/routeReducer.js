import axios from 'axios';

// Action Types
const GET_ROUTE = 'GET_ROUTE';
const GET_LOCATIONS = 'GET_LOCATIONS';

// Initial State
const initialState = {
  locations: [],
  route: [],
  isLoaded: false
}

// Action Creators
export function getLocations(){
  return {
    type: GET_LOCATIONS,
    payload: axios('api/locations')
  }
}

export function getRoute(){
  return{
    type: GET_ROUTE,
    payload: axios('api/locations/route')
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
    default:
      return state
  }
}
