import React, { Component } from 'react';
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';
import { GOOGLE_API_KEY } from '../../frontEndSecrets';
import './Map.css';
const google = window.google;

const DirectionsMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=geometry,drawing,places`,
    loadingElement: <div className='loadingElement' />,
    containerElement: <div className='containerElement' />,
    mapElement: <div className='mapElement' />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      console.log(this.props.route)
      this.props.drawRoute(this.props.route)
    },
    componentDidUpdate(prevProps){
      console.log('prevProps.route: ', prevProps.route)
      if(prevProps.route !== this.props.route){
        console.log('Update Hit, route: ',this.props.route)
        this.props.drawRoute(this.props.route)
      }
      if(prevProps.update !== this.props.update){
        this.props.drawRoute(this.props.route)
      }
    }
  })
)(props =>
  <GoogleMap defaultZoom={7} defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)} >
    {props.directions && <DirectionsRenderer directions={console.log('props direction: ', props.directions)||props.directions} />}
  </GoogleMap>
);


class Map extends Component {
  constructor(props){
    super(props)
    this.state = {
      directions: []
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.update){
      console.log('hit update')
    }
  }

  drawRoute = (route) => {
    const DirectionsService = new google.maps.DirectionsService();

    // creating Waypoints through Route redux
    const origin = route[0]
    const destination = route[route.length - 1]
    const filterRoute = route.filter((e,i) => i !== 0 && i !== route.length - 1 ? e : null)
    const waypoints = filterRoute.map((e, i) => {
      return { location: new google.maps.LatLng({ lat: +e.lat, lng: +e.lng }) }
    })

    // This displays on the map the Routing
    DirectionsService.route({
      origin: new google.maps.LatLng({ lat: +origin.lat, lng: +origin.lng }),
      waypoints: waypoints,
      destination: new google.maps.LatLng({ lat: +destination.lat, lng: +destination.lng }),
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

  render() {
    return (
      <DirectionsMap drawRoute={this.drawRoute} route={this.props.route} directions={this.state.directions} update={this.props.update}/>
    );
  }
}

export default Map;