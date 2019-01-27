import React, { Component } from 'react';
import axios from 'axios';
import './AddRoute.css';

class AddRoute extends Component {
  constructor(props){
    super(props)
    this.state = {
      user_id: 0,
      route_name: '',
      first_stop: 0
    }
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (user, route, stop) => {
    const body = {route_id: this.props.routeLength, route_name: route, location_id: stop, user_id: user, reasons: '', route_order: 1}
    this.props.handleAdd()
    axios.put('/api/routes/new/route', body)
    this.props.getRoute()
  }

  render(){
    console.log(this.props.routeLength)
    return(
      <div className={this.props.addRoute ? 'addRouteDiv' : 'hide'}>
        <h1> Add a Route </h1>
        <div className='addRouteInput'>
          <span className='addRouteNames'> Route Name: <input onChange={this.handleChange} name='route_name'/></span>
          <span className='addRouteNames'> Route User id: <input onChange={this.handleChange} name='user_id'/></span>
          <span className='addRouteNames'> Starting location id: <input onChange={this.handleChange} name='first_stop'/></span>
        </div>
        <button className='submitBtn' onClick={() => this.handleSubmit(this.state.user_id, this.state.route_name, this.state.first_stop)}>Submit</button>
      </div>
    )
  }
}

export default AddRoute;