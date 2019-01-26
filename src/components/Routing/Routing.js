import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Reorder, { reorder } from 'react-reorder';
import ParticlesEffect from '../ParticlesEffect/ParticlesEffect';
import Navbar from '../Navbar/Navbar';
import Map from '../Map/Map';
import './Routing.css';

class Routing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canAdd: false,
      location_id: '',
      reasons: '',
      route: [],
      isLoaded: false,
      update: false,
      edit: false
    }
  }

  componentDidMount() {
    axios.post(`/api/routes/${this.props.match.params.id}`).then(response => {
      this.setState({ route: response.data, isLoaded: true })
    })
  }

  clearArray = (route) => {
    for (let i = 0; i < route.length; i++) {
      delete route[i].lat
      delete route[i].lng
      route[i].route_order = i + 1
    }
    return route
  }

  cleanRoute = async () => {
    let { route_id } = this.state.route[0]
    let del = await axios.delete(`/api/routes/delete/${route_id}`)
    let fullRoute = this.clearArray(this.state.route)
    let body = { route: fullRoute }
    let add = await axios.put('/api/routes/add', body)
  }

  handleDoubleClick = () => {
    this.setState({edit:true})
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleDelete = (e) => {
    let { route } = this.state
    route.splice(e.target.name, 1)
    this.setState({ route, update: !this.state.update })
    console.log(this.state.route)
  }

  addRoute = async (locationId, reason) => {
    const { route } = this.state
    const body = { store_id: +locationId }
    console.log(body)
    let result = await axios.post('/api/locations/exact', body)
    if (result.data) {
      const newRoute = {
        route_id: route[0].route_id,
        route_name: route[0].route_name,
        location_id: +locationId,
        user_id: route[0].user_id,
        reasons: reason,
        route_order: route.length + 1,
        lat: result.data[0].lat,
        lng: result.data[0].lng
      }
      this.setState({ route: [...this.state.route, newRoute], canAdd: false })
    }
  }

  onReorder = (event, previousIndex, nextIndex) => {
    this.setState({
      route: reorder(this.state.route, previousIndex, nextIndex)
    });
  }

  render() {
    let routeMap = [];
    if (this.state.isLoaded) {
      const { route } = this.state
      routeMap = route.map((e, i) => {
        const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        return (
          <div className='routeBody' key={route[i].location_id}>
            <h1 className='routeNumber'>{alphabet[i]}</h1>
            <p onDoubleClick={() => this.handleDoubleClick()} className={!this.state.edit ? 'reasons' : 'hidden'}>{route[i].reasons}</p>
            <input className={this.state.edit ? 'editReasons' : 'hidden'}></input>
            <h1 className='routeId'>{route[i].location_id}</h1>
            <div className='routeDrag'>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div name={i} className='routeDelete' onClick={(e) => this.handleDelete(e)}>X</div>
          </div>
        )
      })
    }
    if (!this.state.isLoaded) {
      return (
        <div>
          Loading...
        </div>
      )
    }
    return (
      <div className='routingMain'>
        <h1 className='routingTitle'> Galaxy Routing </h1>
        <ParticlesEffect />
        <Navbar />
        <Link className='button' to='/admin/routing'><span>Back</span></Link>
        <main className='routingPath'>
          <h1 className='routingPathTitle' >{`Route`}</h1>
          <button className='addBtn' onClick={() => this.setState({ canAdd: !this.state.canAdd })}>{this.state.canAdd ? 'Cancel' : 'Add'}</button>
          <button className='saveBtn' onClick={this.cleanRoute}>Save</button>
          <div className='routeList'>
            <Reorder reorderId="my-list" lock="horizontal" onReorder={this.onReorder}>
              {routeMap}
            </Reorder>
            <div className={this.state.canAdd ? 'routeAdd' : 'hidden'}>
              <p>Add to route</p>
              <input placeholder='Reasons' name='reasons' onChange={this.handleChange}></input>
              <input placeholder='Store_id' name='location_id' onChange={this.handleChange}></input>
              <button onClick={() => this.addRoute(this.state.location_id, this.state.reasons)}>Submit!</button>
            </div>
          </div>
        </main>
        <div className='googleMap'>
          {this.state.route && <Map route={this.state.route} update={this.state.update} />}
        </div>
      </div>
    );
  }
}

export default Routing;