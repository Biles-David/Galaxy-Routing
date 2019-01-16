import React, { Component } from 'react';
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';
import { connect } from 'react-redux';
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
      
      // creating Waypoints through Route redux
      const { route } = this.props.route
      const origin = route[0]
      const destination = route[route.length-1]
      const filterRoute = route.filter((e,i) => {
        if( i !== 0 && i !== route.length-1 ){
          return e
        }
      })
      const waypoints = filterRoute.map((e,i) => {
        return {location: new google.maps.LatLng({lat: e.lat, lng: e.lng})}
      })

      // This displays on the map the Routing
      DirectionsService.route({
        origin: new google.maps.LatLng({ lat: origin.lat, lng: origin.lng }),
        optimizeWaypoints: false,
        waypoints: waypoints,
        destination: new google.maps.LatLng({ lat: destination.lat, lng: destination.lng }),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
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
      <DirectionsMap route={this.props.route} />
      );
    }
  }
  
  const mapStateToProps = state => state
  
export default connect(mapStateToProps, {})(Map);