import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLocations } from '../../ducks/reducers/routeReducer';

import Navbar from '../Navbar/Navbar';
import Map from '../Map/Map';
import './Routing.css';

class Routing extends Component {
  // constructor(props){
  //   super(props)
  // }

  render(){
      const route = this.props.route.route.map( (e, i) => {
        const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
        return (
          <div className='routeBody' key={this.props.route.route[i].store_id}>
            <h1>{alphabet[i]}</h1>
            <p>{this.props.route.route[i].city}</p>
            <h1>{this.props.route.route[i].store_id}</h1>
            <h1>=</h1>
            <h1>X</h1>
          </div>
        )
      })

    return (
      <div className='routingMain'>
        <Navbar/>
        <main className='routingPath'>
          <h1 className='routingPathTitle' >Routing Title</h1>
          {route}
        </main>
        <div className='googleMap'>
          <Map/>
          {/* <App/> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state

export default connect( mapStateToProps, { getLocations } )(Routing);