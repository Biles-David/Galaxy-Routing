import axios from 'axios';

// Action Types
const GET_USERS = 'GET_USERS';
const LOGIN_USER = 'LOGIN_USER'
// *not in use --V
const UPDATE_NAME = 'UPDATE_NAME';
// *not in use --V
const UPDATE_EMPLOYEE_NUMBER = 'UPDATE_EMPLOYEE_NUMBER';
// *not in use --V
const UPDATE_EMAIL = 'UPDATE_EMAIL';
// *not in use --V
const UPDATE_POSITION = 'UPDATE_POSITION';
// *not in use --V
const UPDATE_IMG = 'UPDATE_IMG';
// *not in use --V
const UPDATE_ADMIN = 'UPDATE_ADMIN';
// *not in use --V
const UPDATE_HASH = 'UPDATE_HASH';
const ADD_USER = 'ADD_USER';

// Initial State
const initialState = {
  users: [],
  user: {
    name: 'Eddie Johnson',
    img: 'https://firebasestorage.googleapis.com/v0/b/galaxy-routing.appspot.com/o/images%2FIMG_0313.JPG?alt=media&token=bcca0f8c-eb9d-462c-8c4d-90f8fab3e08b',
    admin: true
  },
  name: '',
  employee_number: 0,
  email: '',
  position: '',
  img: '',
  admin: false,
  hash: ''
}

// Action Creators
export function getUsers() {
  return {
    type: GET_USERS,
    payload: axios('/users')
  }
}

export function loginUser(user) {
  return {
    type: LOGIN_USER,
    payload: axios.post('/users/login', user)
  }
}

export function updateName(name) {
  return {
    type: UPDATE_NAME,
    payload: name
  }
}

export function updateEmployeeNumber(number) {
  return {
    type: UPDATE_EMPLOYEE_NUMBER,
    payload: number
  }
}

export function updateEmail(email) {
  return {
    type: UPDATE_EMAIL,
    payload: email
  }
}

export function updatePosition(position) {
  return {
    type: UPDATE_POSITION,
    payload: position
  }
}

export function updateImg(img) {
  return {
    type: UPDATE_IMG,
    payload: img
  }
}

export function updateAdmin(admin) {
  return {
    type: UPDATE_ADMIN,
    payload: admin
  }
}

export function updateHash(hash) {
  return {
    type: UPDATE_HASH,
    payload: hash
  }
}

export function addUser(user) {
  return {
    type: ADD_USER,
    payload: axios.post('/users/register', user)
  }
}

// Reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case `${GET_USERS}_FULFILLED`:
      return {
        ...state,
        users: action.payload
      }
    case `${GET_USERS}_REJECTED`:
      return console.log('Error getting Users')
    case `${LOGIN_USER}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      }
    case `${LOGIN_USER}_REJECTED`:
    case UPDATE_NAME:
      return console.log('Error logging in.')
    case UPDATE_EMPLOYEE_NUMBER:
      return {
        ...state,
        employee_number: action.payload
      }
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload
      }
    case UPDATE_POSITION:
      return {
        ...state,
        position: action.payload
      }
    case UPDATE_IMG:
      return {
        ...state,
        img: action.payload
      }
    case UPDATE_ADMIN:
      return {
        ...state,
        admin: action.payload
      }
    case UPDATE_HASH:
      return {
        ...state,
        hash: action.payload
      }
    case `${ADD_USER}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      }
    default:
      return state
  }
}
