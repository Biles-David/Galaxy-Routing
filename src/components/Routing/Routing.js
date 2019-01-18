import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLocations, getRoute, clearRoute, addToRoute } from '../../ducks/reducers/routeReducer';
import Navbar from '../Navbar/Navbar';
import Map from '../Map/Map';
import './Routing.css';

class Routing extends Component {
  constructor(props){
    super(props)
    this.state = {
      canAdd: false,
      location_id: '',
      reasons: '',
      needsUpdate: false
    }
  }

  componentDidMount(){
    this.props.getRoute(this.props.match.params.id)
    this.setState({needsUpdate: false})
  }

  // componentDidUpdate(){
  //   if(this.state.needsUpdate){

  //   }
  // }

  componentWillUnmount(){
    this.props.clearRoute()
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }

  addRoute(locationId, reason){
    const { data } = this.props.route.route
    console.log('data: ', data)
    const newRoute = {
      route_id: data[0].route_id,
      route_name: data[0].route_name,
      location_id: locationId,
      user_id: data[0].user_id,
      reasons: reason,
      route_order: data.length + 1
    }
    console.log('newRoute: ', newRoute);
    this.props.addToRoute(this.props.match.params.id, newRoute)
    this.setState({canAdd: false})
  }

  render(){
    // console.log('Props', this.props)
    let { isLoaded } = this.props.route
    let route = [];
      if (isLoaded) {
        const { data } = this.props.route.route
        // console.log(this.props.route.route.data)
        route = data.map( (e, i) => {
          const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
          return (
            <div className='routeBody' key={data[i].location_id}>
              <h1 className='routeNumber'>{alphabet[i]}</h1>
              <p>{data[i].reasons}</p>
              <h1 className='routeId'>{data[i].location_id}</h1>
              <h1>=</h1>
              <button className='routeDelete'>X</button>
            </div>
          )
        })
      } 
    if(!isLoaded){
      return (
        <div>
          Loading...
        </div>
      )
    }
    return (
      <div className='routingMain'>
        {this.props.route.isLoaded }
        <Navbar/>
        <main className='routingPath'>
          <h1 className='routingPathTitle' >Routing Title</h1>
          <button className='addBtn' onClick={ () => this.setState({canAdd: !this.state.canAdd})}>{this.state.canAdd ? 'Cancel' : 'Add'}</button>
          <div className='routeList'>
            {route}
            <div className={this.state.canAdd ? 'routeAdd': 'hidden'}>
              <p>Add to route</p>
              <input placeholder='Reasons' name='reasons' onChange={this.handleChange}></input>
              <input placeholder='Store_id' name='location_id' onChange={this.handleChange}></input>
              <button onClick={() => this.addRoute(this.state.location_id, this.state.reasons)}>Submit!</button>
            </div>
          </div>
        </main>
        <div className='googleMap'>
          {this.props.route.route.data && <Map/>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state

export default connect( mapStateToProps, { getLocations, getRoute, clearRoute, addToRoute } )(Routing);