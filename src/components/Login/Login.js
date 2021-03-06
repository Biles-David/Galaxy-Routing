import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../../ducks/reducers/userReducer';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      hidden: true,
      user: {}
    }
  }

  keyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleLogin({ email: this.state.email, password: this.state.password })
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleLogin = async (user) => {
    const result = await this.props.loginUser(user)
    if(result.value.data.admin === true){
      return this.props.history.push('/admin/routing')
    } else {
      return this.props.history.push(`/user/${result.value.data.id}`)
    }
  }

  render() {
    return (
      <div className='login_homeDiv'>
        <h1 className='loginTitle'> Galaxy Routing </h1>
        <div className='loginDiv'>
          <h1>Login</h1>
          <div className='inputDiv'>
            <input name='email' type='text' placeholder='E-mail' onChange={this.handleChange}></input>
            <input name='password' type={this.state.hidden ? 'password' : 'text'} placeholder='Password' onChange={this.handleChange} onKeyPress={this.keyPress}></input>
            <img
              src='http://cdn.onlinewebfonts.com/svg/download_184499.png'
              alt='hidden'
              className={this.state.password ? 'hiddenEye' : 'hidden'}
              onClick={() => this.setState({ hidden: !this.state.hidden })}
            />
          </div>
          <div className='loginBtnMain'>
            <Link to='/'> <button className='loginBtn'>Cancel</button> </Link>
            <button className='loginBtn' onClick={() => this.handleLogin({ email: this.state.email, password: this.state.password })}>Continue</button>
          </div>
          <p className={this.props.error ? 'errorMsg' : 'hidden'}>{this.props.error}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.user.error,
    user: state.user.user
  }
}

export default connect(mapStateToProps, { loginUser })(Login);