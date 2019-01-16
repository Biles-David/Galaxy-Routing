import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import './Login.css';

class Login extends Component{

  render(){
    return(
      <div>
        <Navbar />
        <main className='loginMain'>
          <h1 className='loginTitle'>Login</h1>
          <div className='loginInput'>
            <input type='text' placeholder='Username'></input>
            <input type='password' placeholder='Password'></input>
          </div>
          <button className='loginBtn'>Continue</button>
        </main>
      </div>
    )
  }
}

export default Login;