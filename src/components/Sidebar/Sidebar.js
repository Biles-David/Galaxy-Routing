import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../../ducks/reducers/userReducer';
import './Sidebar.css';

class Sidebar extends Component {

  render() {
    return (
      <div className='sidebarMain'>
        <h1>Menu</h1>
        <div className='sidebarBody'>
          <Link className={this.props.location.pathname.includes('/user') ? 'hidden' : 'sidebarLink'} to={`/user/${this.props.user.user.id}`}> <img className='sidebarIcon' src='/icons/file.png' alt='test' /> <p>Switch to User</p> </Link>
          {this.props.user.user.admin && <Link className={this.props.location.pathname === '/admin/routing' ? 'hidden' : 'sidebarLink'} to={`/admin/routing`}> <img className='sidebarIcon' src='/icons/network.png' alt='test' /> <p>Switch to Admin</p> </Link>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { logout })(withRouter(Sidebar));