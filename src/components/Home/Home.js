import React, { Component } from 'react';
import ParticleEffect from '../ParticlesEffect/ParticlesEffect';
import Login from '../Login/Login';
import Register from '../Register/Register';
import './Home.css';

class Home extends Component {
  constructor() {
    super()
    this.state = {
      register: true
    }
  }

  handleClick = () => {
    this.setState({ register: !this.state.register })
  }

  render() {
    if (!this.state.register) {
      return (
        <>
          <ParticleEffect />
          <Login handleClick={this.handleClick} className='homeLogin' />
        </>
      )
    } else {
      return (
        <>
          <ParticleEffect />
          <Register handleClick={this.handleClick} />
        </>
      )
    }
  }
}

export default Home