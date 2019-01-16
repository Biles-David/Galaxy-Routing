import React, { Component } from 'react';
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react';
// import Geocode from 'react-geocode';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import './Routing.css';
require('dotenv').config()

// Geocode.setApiKey('AIzaSyBNoIEJd15hn7DQOVoYB90qjv75cJ_I8W0')

class Routing extends Component {
  constructor(props){
    super(props)
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      locations: [],
      isLoaded: false,
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
        {address: "3701 N Main St",
        city: "Taylor",
        phone: "(512) 352-5505",
        state: "TX",
        store_id: "77",
        store_name: "Walmart",
        zip: "76574",
        lat: 30.5986668,
        lng: -97.41751909999999},
        {address: "2500 Daniel Mccall Dr",
        city: "Lufkin",
        phone: "(936) 639-9600",
        state: "TX",
        store_id: "140",
        store_name: "Walmart",
        zip: "75904",
        lat: 31.2997975,
        lng: -94.7313099}
      ]
    }
  }

  componentDidMount(){
    axios('/api/locations')
    .then( res => this.setState({ locations: res.data}))
    .catch(err => console.log(err))
    this.setState({isLoaded: true})
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  render(){
    // if(this.state.isLoaded){
    //   this.state.locations.forEach((e) => {
    //     let fullAddress = `${e.address} ${e.city} ${e.state} ${e.zip}`
    //     axios(`https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&bounds=34.172684,-118.604794|34.236144,-118.500938&key=AIzaSyBNoIEJd15hn7DQOVoYB90qjv75cJ_I8W0`)
    //     .then( response => {
    //       const { lat, lng } = response.data.results[0].geometry.location
    //       console.log(lat, lng, e.store_id)
    //       let body = {lat, lng, store_id: e.store_id}
    //       axios.post('/api/locations/coordinates', body)
    //     })
    //   })
    // }
    const map = this.state.locations.map(( e, i ) => {
      let fullAddress = `${e.address} ${e.city} ${e.state} ${e.zip}`
      return(
          <Marker 
            key={e.store_id}
            position={{lat: e.lat, lng: e.lng}}
            onClick={this.onMarkerClick}
            name={`${e.store_name} Store #${e.store_id}`}
            title={fullAddress}
          />
      )
    })

    if(!this.props.loaded){
      return(
        <div> Loading...</div>
      )
    }
    return (
      <div className='routingMain'>
        <Navbar/>
        <main className='routingPath'>
          Routing
        </main>
        
        <div className='googleMap'>
          <Map 
            google={this.props.google}
            className='map'
            onClick={this.onMapClick}
            initialCenter={{lat: this.state.route[0].lat, lng: this.state.route[0].lng}}
            zoom={8}
            >
            {map}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
                <div>
                  <h1>{this.state.selectedPlace.name}</h1>
                  <h3>{this.state.selectedPlace.title}</h3>
                </div>
            </InfoWindow>
          </Map>
        </div>
      </div>
    );
  }
}


export default GoogleApiWrapper(
  {apiKey: 'AIzaSyBNoIEJd15hn7DQOVoYB90qjv75cJ_I8W0'} 
)(Routing);