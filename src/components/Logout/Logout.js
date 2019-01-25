import React, { Component } from 'react';
import './Logout.css'

class Logout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logout: false
    }
  }

  handleClick = () => {
    this.setState({logout: !this.state.logout})
  }

  render() {
    return (
      <div className='logoutMain' onClick={()=> this.handleClick()}>
        Logout
        {console.log('logout: ', this.state.logout)}
      </div>
    );
  }
}

export default Logout;