import axios from 'axios';

// Action Types
const GET_USERS = 'GET_USERS';
const LOGIN_USER = 'LOGIN_USER';
const GET_SESSION = 'GET_SESSION';
const ADD_USER = 'ADD_USER';
const LOGOUT = 'LOGOUT';
// const UPDATE_NAME = 'UPDATE_NAME';
// const UPDATE_EMPLOYEE_NUMBER = 'UPDATE_EMPLOYEE_NUMBER';
// const UPDATE_EMAIL = 'UPDATE_EMAIL';
// const UPDATE_POSITION = 'UPDATE_POSITION';
// const UPDATE_IMG = 'UPDATE_IMG';
// const UPDATE_ADMIN = 'UPDATE_ADMIN';
// const UPDATE_HASH = 'UPDATE_HASH';

// Initial State
const initialState = {
  users: [],
  user: {
    // name: 'Eddie Johnson',
    // img: 'https://firebasestorage.googleapis.com/v0/b/galaxy-routing.appspot.com/o/images%2FIMG_0313.JPG?alt=media&token=bcca0f8c-eb9d-462c-8c4d-90f8fab3e08b',
    // admin: true
  },
  error: ''
  // name: '',
  // employee_number: 0,
  // email: '',
  // position: '',
  // img: '',
  // admin: false,
  // hash: '',
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

export function addUser(user) {
  return {
    type: ADD_USER,
    payload: axios.post('/users/register', user)
  }
}

export function getSession() {
  return {
    type: GET_SESSION,
    payload: axios('/users/session')
  }
}

export function logout() {
  return {
    type: LOGOUT,
    payload: axios('/users/logout')
  }
}

// export function updateName(name) {
//   return {
//     type: UPDATE_NAME,
//     payload: name
//   }
// }

// export function updateEmployeeNumber(number) {
//   return {
//     type: UPDATE_EMPLOYEE_NUMBER,
//     payload: number
//   }
// }

// export function updateEmail(email) {
//   return {
//     type: UPDATE_EMAIL,
//     payload: email
//   }
// }

// export function updatePosition(position) {
//   return {
//     type: UPDATE_POSITION,
//     payload: position
//   }
// }

// export function updateImg(img) {
//   return {
//     type: UPDATE_IMG,
//     payload: img
//   }
// }

// export function updateAdmin(admin) {
//   return {
//     type: UPDATE_ADMIN,
//     payload: admin
//   }
// }

// export function updateHash(hash) {
//   return {
//     type: UPDATE_HASH,
//     payload: hash
//   }
// }


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
      return {
        ...state,
        error: 'Username or Password Incorrect'
      }
    case `${ADD_USER}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      }
    case `${ADD_USER}_REJECTED`:
      return {
        ...state,
        error: 'Something went wrong'
      }
    case `${GET_SESSION}_FULFILLED`:
      return {
        ...state,
        user: console.log('action.payload.data: ', action.payload.data) || action.payload.data
      }
    case `${GET_SESSION}_REJECTED`:
      return {
        ...state,
        error: 'Could not get Session'
      }
    case `${LOGOUT}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      }
    default:
      return state
  }
}
