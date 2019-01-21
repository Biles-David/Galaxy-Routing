import React from 'react';
import { connect } from 'react-redux';
import './Navbar.css'

const Navbar = props => {
  return (
    <div className='navbarMain'>
      {/* <h1 className='navbarTitle'> Galaxy Routing</h1> */}
      <div className='userDisplay'>
        <div className='navbarMenuBox'>
          <table className='navbarMenu'>
            <td></td>
            <td></td>
            <td></td>
          </table>
          <table className='navbarMenu'>
            <td></td>
            <td></td>
            <td></td>
          </table>
          <table className='navbarMenu'>
            <td></td>
            <td></td>
            <td></td>
          </table>
        </div>
        <h5 className='navbarName'>{props.user.name}</h5>
        <img className='navbarImg' src={props.user.img} />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps)(Navbar);