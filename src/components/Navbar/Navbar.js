import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../ducks/reducers/userReducer';
import { getSession } from '../../ducks/reducers/userReducer';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import './Navbar.css'

class Navbar extends Component {
constructor(props){
  super(props)
  this.state = {
    user: {},
    showTab: false,
    redirect: false
  }
}

  async componentDidMount(){
    const response = await this.props.getSession()
    this.setState({user: response.value.data})
  }

  resetRedirect = () => {
    this.setState({redirect:false})
  }

  handleClick() {
    Swal.fire({
      title: 'Are you sure you want to Logout?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Goodbye!',
          text: 'You have been successfully logged out.',
          type: 'success',
          timer: 1000,
          showConfirmButton: false
        }).then(() => {
          this.props.logout()
          this.setState({user: {}, redirect: true, showTab: false})
        })
      } else {
        this.setState({showTab: false})
      }
    })
  }

  render(){
    if(this.state.redirect){
      this.resetRedirect()
      return (
        <Redirect to='/'/>
      )
    }
    return (
      <div className={ this.props.user.name ? 'navbarMain' : 'hidden'}>
      <div className='userDisplay'>
        <div className='navbarMenuBox' onClick={() => this.setState({showTab: !this.state.showTab})}>
          <div className='navbarMenu'>
            <span></span>
            <span></span>
          </div>
          <div className='navbarMenu'>
            <span></span>
            <span></span>
          </div>
        </div>
        { this.state.showTab &&
          <div className='navbarTabMain'>
            {/* <div className='navbarTabLink'>Edit Profile</div> */}
            <div className='navbarTabLink' onClick={() => this.handleClick()}>Logout </div>
          </div>
        }
        <h5 className='navbarName'>{this.props.user.name}</h5>
        <img className='navbarImg' src={this.props.user.img} />
      </div>
      
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps, { getSession, logout })(Navbar);