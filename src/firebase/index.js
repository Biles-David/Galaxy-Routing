import firebase from 'firebase/app';
import 'firebase/storage';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCOJNcYP5fe3_iUQU4hnAsSuV9HqnIiWU4",
  authDomain: "galaxy-routing.firebaseapp.com",
  databaseURL: "https://galaxy-routing.firebaseio.com",
  projectId: "galaxy-routing",
  storageBucket: "galaxy-routing.appspot.com",
  messagingSenderId: "569839177182"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export {
  storage, firebase as default
}