import React, { Component } from 'react';
import { compose, withProps } from "recompose";
import PropTypes from 'prop-types';
import { Marker, withScriptjs, withGoogleMap, GoogleMap, } from 'react-google-maps';
import { GOOGLE_API_KEY } from '../../frontEndSecrets'
import './UserMap.css';
const google = window.google;

const DirectionsMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=geometry,drawing,places`,
    loadingElement: <div className='loadingUserElement' />,
    containerElement: <div className='containerUserElement' />,
    mapElement: <div className='mapUserElement' />,
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  return (
    <GoogleMap defaultZoom={9} center={new google.maps.LatLng(props.location)}>
      <Marker position={new google.maps.LatLng(props.location)}/>
    </GoogleMap>
  )
}
);

class UserMap extends Component {
  render() { 
    return ( 
      <DirectionsMap location={this.props.location}/>
      );
    }
  }

export default UserMap;

UserMap.propTypes = {
  location: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }).isRequired
}