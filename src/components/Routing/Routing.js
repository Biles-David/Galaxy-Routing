import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
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
      startRoute: [],
      isLoaded: false,
      update: false,
      edit: false,
      redirectRoute: false,
      editNumber: null
    }
  }

  // Grabs Routes from Database 
  componentDidMount() {
    axios.post(`/api/routes/${this.props.match.params.id}`).then(response => {
      this.setState({ route: response.data, startRoute: response.data, isLoaded: true })
    })
  }

  // removes unwanted items from array getting ready to replace database info
  clearArray = (route) => {
    this.setState({startRoute: this.state.route})
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
    console.log(del, add);
  }

  handleSave = () => {
    this.cleanRoute()
    Swal.fire({
      position: 'top-end',
      type: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1000
    })
  }

  handleDoubleClick = (i) => {
    this.setState({edit:true, editNumber: i})
  }

  handleCancelEdit = () => {
    this.setState({edit: false, editNumber: null})
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleUpdate = (text, id) => {
    let { route } = this.state
    route[id].reasons = text
    this.setState({route: route, edit: false, editNumber: null})
  }

  handleDelete = (e) => {
    let { route } = this.state
    route.splice(e.target.name, 1)
    this.setState({ route, update: !this.state.update })
  }

  addRoute = async (locationId, reason) => {
    const { route } = this.state
    const body = { store_id: +locationId }
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

  handleSwal = () => {
    const { route, startRoute} = this.state 
    if(startRoute !== route){
        Swal.fire({
          title: 'You have made changes',
          text: 'Do you want to save before exiting?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
          cancelButtonText: "No, I don't"
        }).then((result) => {
          if ( result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              title: 'No changes were made',
              type: 'error',
              timer: 1000,
              showConfirmButton: false
            }).then(() => {
              this.setState({redirectRoute: true})
            })          
          }
        })
    } else {
      this.setState({redirectRoute: true})
    }
  }

  render() {
    let routeMap = [];
    if (this.state.isLoaded) {
      const { route } = this.state
      routeMap = route.map((e, i) => {
        const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        return (
          <div className='routingBody' key={route[i].location_id}>
            <h1 className='routingNumber'>{alphabet[i]}</h1>
            <p onDoubleClick={() => this.handleDoubleClick(i)} className={this.state.editNumber !== i ? 'reasons' : 'hidden'}>{route[i].reasons}</p>
            <input name='reasons' className={this.state.editNumber === i ? 'editReasons' : 'hidden'} onChange={this.handleChange}></input>
            <h1 className='routeId'>{route[i].location_id}</h1>
            <div className='routingDrag'>
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
    if(this.state.redirectRoute){
      let reset = () => {this.setState({redirect:false})}
      reset()
      return (
        <Redirect to='/admin/routing'/>
      )
    }
    return (
      <div className='routingMain'>
        <h1 className='routingTitle'> Galaxy Routing </h1>
        <ParticlesEffect />
        <Navbar />
        <button className='button' onClick={() => console.log('hit') || this.handleSwal()}><span>Back</span></button>
        <main className='routingPath'>
          <h1 className='routingPathTitle' >{`Route`}</h1>
          <button className='addBtn' onClick={() => this.setState({ canAdd: !this.state.canAdd })}>{this.state.canAdd ? 'Cancel' : 'Add'}</button>
          <button className='saveBtn' onClick={this.handleSave}>Save</button>
          <div className='routingList'>
          <div className={this.state.edit ? 'routing_update_div' : 'hidden'}>
            <p className='routing_update_reasons'> Update Reasons? </p>
            <button onClick={() => this.handleCancelEdit()}>Cancel</button>
            <button onClick={() => this.handleUpdate(this.state.reasons, this.state.editNumber)}>Confirm</button>
          </div>
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