import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { getRoutes } from '../../ducks/reducers/routeReducer';
import { Link } from 'react-router-dom';
import './RouteList.css';

class RouteList extends Component {

  componentDidMount(){
    this.props.getRoutes()
  }

  render() { 
    console.log(this.props)
    const { allRoutes, isLoaded } = this.props
    let routes = []
    if(isLoaded){
      routes = allRoutes.map( (e, i) => {
        return (
          <Link to={`/admin/routing/${allRoutes[i].route_id}`} key={i} className='routeDiv'>
            <img src={allRoutes.img} alt='img'/>
            <h1>Route id: {allRoutes[i].route_id}</h1>
            <h1>Purchaser: {allRoutes[i].name}</h1>
            <h1>Route count: {allRoutes[i].count}</h1>
          </Link>
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
      <div>
        <Navbar />
        <main className='routesMain'>
          {routes}
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allRoutes: state.route.allRoutes.data,
    isLoaded: state.route.routesLoaded
  }
};

export default connect( mapStateToProps, { getRoutes } )(RouteList);