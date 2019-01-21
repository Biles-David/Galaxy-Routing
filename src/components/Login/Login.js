import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../ducks/reducers/userReducer';
import './Login.css';

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      hidden: true,
      user: {}
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleLogin = async (user) => {
    const result = await this.props.loginUser(user)
    console.log(result)
    // this.setState({user: result.value.data})
  }

  render() { 
    return (
      <div className='loginDiv'>
      <h1>Login</h1>
      <div className='inputDiv'>
        <input name='email' type='text' placeholder='E-mail' onChange={this.handleChange}></input>
        <input name='password' type={ this.state.hidden ? 'password' : 'text'} placeholder='Password' onChange={this.handleChange}></input>
        <img 
          src='http://cdn.onlinewebfonts.com/svg/download_184499.png'
          alt='hidden'
          className={ this.state.password ? 'hiddenEye' : 'hidden'}
          onClick={()=> this.setState({hidden: !this.state.hidden})}
        />
      </div>
      <button onClick={() => this.handleLogin({email: this.state.email, password: this.state.password})}>Continue</button>
      <button onClick={() => this.props.handleClick()}>Register</button>
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps, { loginUser })(Login);