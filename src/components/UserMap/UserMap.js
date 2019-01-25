import React, { Component } from 'react';
import { compose, withProps } from "recompose";
import { Marker, withScriptjs, withGoogleMap, GoogleMap, } from 'react-google-maps';
import api_key from '../../frontEndSecrets'
import { connect } from 'react-redux';
import './UserMap.css';
const google = window.google;

const DirectionsMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${api_key}&libraries=geometry,drawing,places`,
    loadingElement: <div className='loadingUserElement' />,
    containerElement: <div className='containerUserElement' />,
    mapElement: <div className='mapUserElement' />,
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  let position = props.route[props.count]
  let location = !position ? {lat: 0, lng: 0} : {lat: +position.lat, lng: +position.lng}
  return (
    <GoogleMap
      defaultZoom={9}
      defaultCenter={new google.maps.LatLng(location)}
    >
    <Marker position={new google.maps.LatLng(location)}/>
    </GoogleMap>
  )
}
);


class Map extends Component {
  constructor(){
    super()
    this.state = {
      route: []
    }
  }

  render() { 
    return ( 
      <DirectionsMap count={this.props.count} route={this.state.route[0] ? this.state.route : this.props.route} />
      );
    }
  }
  
  const mapStateToProps = state => {
    return {
      route: state.route.route.data
    }
  }
  
export default connect(mapStateToProps, {})(Map);