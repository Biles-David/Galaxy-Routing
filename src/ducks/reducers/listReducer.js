import axios from 'axios';

//Action Types
const GET_CHECKLIST = 'GET_CHECKLIST';
const ADD_TO_CHECKLIST = 'ADD_TO_CHECKLIST';
const DELETE_ITEM = 'DELETE_ITEM';

// Initial State
const initialState = {
  list: []
}

// Action Creators
export function getChecklist() {
  return {
    type: GET_CHECKLIST,
    payload: axios('/api/checklist')
  }
}

export function addToChecklist(content) {
  return {
    type: ADD_TO_CHECKLIST,
    payload: axios.post('/api/checklist/add', content)
  }
}

export function deleteItem(id) {
  return {
    type: DELETE_ITEM,
    payload: axios.delete(`/api/checklist/delete/${id}`)
  }
}

// Reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case `${GET_CHECKLIST}_FULFILLED`:
      return {
        ...state,
        list: action.payload.data
      }
    case `${ADD_TO_CHECKLIST}_FULFILLED`:
      return {
        ...state,
        list: action.payload.data
      }
    case `${DELETE_ITEM}_FULFILLED`:
      return {
        ...state,
        list: action.payload.data
      }
    default:
      return state
  }
}