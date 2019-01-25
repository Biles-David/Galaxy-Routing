import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ParticleEffect from '../ParticlesEffect/ParticlesEffect';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Navbar from '../Navbar/Navbar';
import './Home.css';

class Home extends Component {
  constructor() {
    super()
    this.state = {
      register: false
    }
  }

  handleClick = () => {
    this.setState({ register: !this.state.register })
  }

  render() {
    if (!this.state.register) {
      return (
        <>
          <Navbar />
          <div className='homeDiv'>
            <ParticleEffect />
            <Login
              handleLogin={this.handleLogin}
              handleClick={this.handleClick}
              className='homeLogin'
            />
            {
              this.props.user.name ?
                <Redirect push to={
                  this.props.user.admin ? '/admin/routing' : `/user/${this.props.user.id}`
                } /> : null
            }
          </div>
        </>
      )
    } else {
      return (
        <div className='homeDiv'>
          <ParticleEffect />
          <Register handleClick={this.handleClick} />
          {
            this.props.user.name ?
              <Redirect push to={
                this.props.user.admin ? '/admin/routing' : '/user'
              } /> : null
          }
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps)(Home)