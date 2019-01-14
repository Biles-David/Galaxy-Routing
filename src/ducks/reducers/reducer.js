import axios from 'axios';

const initialState = {
  users: []
}

const GET_USERS = 'GET_USERS';

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

export function getUsers(){
  return {
    type: GET_USERS,
    payload: axios('api/users')
  }
}