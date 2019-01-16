import React, { Component } from 'react';
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';
import './Map.css'
const google = window.google;

const DirectionsMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBNoIEJd15hn7DQOVoYB90qjv75cJ_I8W0&libraries=geometry,drawing,places",
    loadingElement: <div className='loadingElement' />,
    containerElement: <div className='containerElement' />,
    mapElement: <div className='mapElement' />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route({
        origin: new google.maps.LatLng({ lat: 33.1345146, lng: -94.96463709999999 }),
        waypoints: [{location: new google.maps.LatLng({lat: 30.5986668, lng: -97.41751909999999})}],
        destination: new google.maps.LatLng({ lat: 31.2997975, lng: -94.7313099 }),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
          console.log(result)
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props => 
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
);

class Map extends Component {

  render() { 
    return ( 
      <DirectionsMap />
    );
  }
}

export default Map;