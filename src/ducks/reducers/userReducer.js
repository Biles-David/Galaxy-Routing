import axios from 'axios';

// Action Types
const GET_USERS = 'GET_USERS';

// Initial State
const initialState = {
  users: []
}

// Action Creators
export function getUsers(){
  return {
    type: GET_USERS,
    payload: axios('api/users')
  }
}

// Reducer
export default function ( state=initialState, action){
  switch(action.type){
    case `${GET_USERS}_FULFILLED`:
      return {
        ...state,
        users: action.payload
      }
      default:
        return state
  }
}
