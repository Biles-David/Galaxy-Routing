import React, { Component } from 'react';
import './Sidebar.css';

class Sidebar extends Component {
  constructor() {
    super()
    this.state = {
      links: ['Home', 'Check List', 'Purchasing', 'Edit Profile', 'Logout']
    }
  }
  render() {
    const map = this.state.links.map((e, i) => {
      return (
        <li key={i} className='sidebarLink'>
          {e}
        </li>
      )
    })
    return (
      <div className='sidebarMain'>
      <h1>Menu:</h1>
        <ul className='sidebarUl'>
          {map}
        </ul>
      </div>
    );
  }
}

export default Sidebar;