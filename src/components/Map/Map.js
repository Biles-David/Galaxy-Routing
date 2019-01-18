import React, { Component } from 'react';
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';
import api_key from '../../frontEndSecrets'
import { connect } from 'react-redux';
import './Map.css';
const google = window.google;

const DirectionsMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${api_key}&libraries=geometry,drawing,places`,
    // googleMapURL: process.env.GOOGLE_MAP_KEY,
    loadingElement: <div className='loadingElement' />,
    containerElement: <div className='containerElement' />,
    mapElement: <div className='mapElement' />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();
      
      // console.log(this.props.route[0])

      // creating Waypoints through Route redux
      const { route } = this.props
      // console.log(route)
      const origin = route[0]
      const destination = route[route.length-1]
      const filterRoute = route.filter((e,i) => {
        if( i !== 0 && i !== route.length-1 ){
          return e
        }
      })
      const waypoints = filterRoute.map((e,i) => {
        return {location: new google.maps.LatLng({lat: +e.lat, lng: +e.lng})}
      })

      // This displays on the map the Routing
      DirectionsService.route({
        origin: new google.maps.LatLng({ lat: +origin.lat, lng: +origin.lng }),
        optimizeWaypoints: false,
        waypoints: waypoints,
        destination: new google.maps.LatLng({ lat: +destination.lat, lng: +destination.lng }),
        travelMode: google.maps.TravelMode.DRIVING,
        // optimizeWaypoints: true,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    },
    componentDidUpdate() {
      const DirectionsService = new google.maps.DirectionsService();
      
      // console.log(this.props.route[0])

      // creating Waypoints through Route redux
      const { route } = this.props
      // console.log(route)
      const origin = route[0]
      const destination = route[route.length-1]
      const filterRoute = route.filter((e,i) => {
        if( i !== 0 && i !== route.length-1 ){
          return e
        }
      })
      const waypoints = filterRoute.map((e,i) => {
        return {location: new google.maps.LatLng({lat: +e.lat, lng: +e.lng})}
      })

      // This displays on the map the Routing
      DirectionsService.route({
        origin: new google.maps.LatLng({ lat: +origin.lat, lng: +origin.lng }),
        optimizeWaypoints: false,
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
  constructor(){
    super()
    this.state = {
      route: []
    }
  }
  componentWillMount(){
    console.log('map props: ', this.props)
  }

  componentDidUpdate(prevProps){
    console.log('map prev props: ', prevProps.route.length)
    console.log('map current props: ', this.props.route.length)
    if(prevProps.route.length < this.props.route.length){
      console.log('Tried to force update')
      // this.setState({route: this.props.route})
      // this.forceUpdate()
      // window.location.reload(false)
    }
  }

  render() { 
    return ( 
      <DirectionsMap route={this.state.route[0] ? this.state.route : this.props.route} />
      );
    }
  }
  
  const mapStateToProps = state => {
    return {
      route: state.route.route.data
    }
  }
  
export default connect(mapStateToProps, {})(Map);