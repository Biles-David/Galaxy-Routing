import axios from 'axios';

// Action Types
const GET_ROUTE = 'GET_ROUTE';
const GET_LOCATIONS = 'GET_LOCATIONS';

// Initial State
const initialState = {
  locations: [],
  route: [
    {address: "2311 S Jefferson Ave",
    city: "Mount Pleasant",
    phone: "(903) 572-0018",
    state: "TX",
    store_id: "131",
    store_name: "Walmart",
    zip: "75455",
    lat: 33.1345146,
    lng: -94.96463709999999},
    {address: "2500 Daniel Mccall Dr",
    city: "Lufkin",
    phone: "(936) 639-9600",
    state: "TX",
    store_id: "140",
    store_name: "Walmart",
    zip: "75904",
    lat: 31.2997975,
    lng: -94.7313099},
    {address: '15955 Fm 529 Rd',
    city: 'Houston',
    phone: '(281) 855-1604',
    state: 'TX',	
    store_id: '1040',
    store_name:	'Walmart',
    zip:	'77095',
    lat:	29.8769685,
    lng:	-95.65187490000001},  
    {address: "3701 N Main St",
    city: "Taylor",
    phone: "(512) 352-5505",
    state: "TX",
    store_id: "77",
    store_name: "Walmart",
    zip: "76574",
    lat: 30.5986668,
    lng: -97.41751909999999}
  ],
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
