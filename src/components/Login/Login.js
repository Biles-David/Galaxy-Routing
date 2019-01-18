import React from 'react';
import './Login.css';

const Login = (props) => {
  return (
    <div className='loginDiv'>
      <h1>Login</h1>
      <div className='inputDiv'>
        <input type='text' placeholder='E-mail'></input>
        <input type='password' placeholder='Password'></input>
      </div>
      <button>Continue</button>
      <button onClick={() => props.handleClick()}>Register</button>
    </div>
  )
}

export default Login;