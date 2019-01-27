import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRoutes } from '../../ducks/reducers/routeReducer';
import { Link, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import ParticlesEffect from '../ParticlesEffect/ParticlesEffect';
import Sidebar from '../Sidebar/Sidebar';
import AddRoute from '../AddRoute/AddRoute';
import axios from 'axios';
import './RouteList.css';

class RouteList extends Component {
  constructor(){
    super()
    this.state = {
      addRoute: false
    }
  }

  componentDidMount() {
    this.getRoute()
  }

  getRoute(){
    this.props.getRoutes()
  }

  handleAdd = () => {
    this.setState({addRoute: !this.state.addRoute})
  }

  handleDelete = (e) => {
    console.log(e.target.name)
    let index = e.target.name
    Swal.fire({
      title: 'Warning!',
      text: 'Do you want to delete this route?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Success!',
          text: `Route ( ${this.props.allRoutes[index].route_name} ) has been successfully deleted.`,
          type: 'success',
          timer: 1800,
          showConfirmButton: false
        }).then(() => {
          axios.delete(`/api/routes/delete/${this.props.allRoutes[index].route_id}`).then( response => {
            this.getRoute()
          })
        })
      }
    })
  }

  render() {
    const { allRoutes, isLoaded } = this.props
    let routes = []
    if (isLoaded) {
      routes = allRoutes.map((e, i) => {
        return (
          <div className='routeList' key={i}>
          <Link to={`/admin/routing/${allRoutes[i].route_id}`} key={i} className='routeDiv'>
            <img className='routeImg' src={allRoutes[i].img} alt='img' />
            <div>
              <h1 className='routeTitle'>Route </h1>
              <h2>{allRoutes[i].route_name}</h2>
            </div>
            <div>
              <h1 className='routeTitle'>Driver </h1>
              <h2>{allRoutes[i].first_name} {allRoutes[i].last_name} </h2>
            </div>
            <div>
              <h1 className='routeTitle'>Route count </h1>
              <h2>{allRoutes[i].count}</h2>
            </div>
          </Link>
          <button name={i} className='deleteRoute' onClick={(e) => this.handleDelete(e)}>Delete -</button>
          </div>
        )
      })
    }
    if (!isLoaded) {
      return (
        <div>
          Loading...
        </div>
      )
    }
    if (this.props.user.admin === false) {
      return console.log('not admin: ', this.props.user.admin) || <Redirect path to="/user" ></Redirect>
    }
    return (
      <div className='routelistMain'>
        <ParticlesEffect />
        <h2 className='title'>Galaxy Routing</h2>
        <Sidebar />
        <button className='addRoute' onClick={() => this.handleAdd()}>{this.state.addRoute ? 'Cancel' : 'Add Route +'}</button>
        <main className='routesMain'>
          {routes}
        </main>
        <AddRoute getRoute={this.getRoute} routeLength={this.props.allRoutes.length +1} handleAdd={this.handleAdd} addRoute={this.state.addRoute}/>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    allRoutes: state.route.allRoutes.data,
    isLoaded: state.route.routesLoaded,
    user: state.user.user
  }
};

export default connect(mapStateToProps, { getRoutes })(RouteList);