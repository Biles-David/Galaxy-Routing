import React, { Component } from 'react';
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";
const google = window.google;

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBNoIEJd15hn7DQOVoYB90qjv75cJ_I8W0&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route({
        origin: new google.maps.LatLng({ lat: 33.1345146, lng: -94.96463709999999 }),
        // legs: new google.maps.LatLng({ lat: 30.5986668, lng: -97.41751909999999 }),
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
      <MapWithADirectionsRenderer />
    );
  }
}

export default Map

// import React, { Component } from 'react';
// import { DirectionsRenderer, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

// const MapWithAMarker = withGoogleMap(props =>
//   <GoogleMap
//     defaultZoom={8}
//     defaultCenter={{ lat: 33.1345146, lng: -94.96463709999999 }}
//   >
//     <Marker
//       position={{ lat: 33.1345146, lng: -94.96463709999999 }}
//     />
//     <Marker 
//       position={{ lat: 30.5986668, lng: -97.41751909999999 }}
//     />
//   </GoogleMap>
// );

// class Map extends Component {
//   render() { 
//     return ( 
//       <MapWithAMarker
//         containerElement={<div style={{ height: `400px` }} />}
//         mapElement={<div style={{ height: `100%` }} />}
//       />
//     );
//   }
// }

// export default Map