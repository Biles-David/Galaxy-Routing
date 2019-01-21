import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import './UserMain.css';

class UserMain extends Component {
  state = {  }
  render() { 
    return (
      <div>
        <Navbar/>
        <Sidebar/>
        <div className='userMain'>

        </div>
        {/* User Main */}
      </div>
    );
  }
}

export default UserMain;