import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRoutes } from '../../ducks/reducers/routeReducer';
import { Link, Redirect } from 'react-router-dom';
import ParticlesEffect from '../ParticlesEffect/ParticlesEffect';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import './RouteList.css';

class RouteList extends Component {

  componentDidMount() {
    this.props.getRoutes()
  }

  render() {
    // console.log(this.props)
    const { allRoutes, isLoaded } = this.props
    let routes = []
    if (isLoaded) {
      routes = allRoutes.map((e, i) => {
        return (
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
        <main className='routesMain'>
          {routes}
        </main>
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