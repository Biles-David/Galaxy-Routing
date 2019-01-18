import React from 'react';
import './Register.css';

const Register = (props) => {

  return (
    <div className='registerBody'>
      <div className='registerDiv'>
        <h1>Register</h1>
        <div className='imgDiv'>
          <img className='registerImg' src='https://www.awwu.biz/Home/ShowPublishedImage/743/636705502595800000' alt='Profile Image'/>
          <p className='addPhoto'>Click to add Photo</p>
        </div>
        <div className='register_inputDiv'>
          <input type='text' placeholder='Name'></input>
          <input type='text' placeholder='E-mail'></input>
          <input type='password' placeholder='Password'></input>
          <input type='password' placeholder='Confirm Password'></input>
        </div>
        <button onClick={() => props.handleClick()}>Cancel</button>
        <button>Register!</button>
      </div>
    </div>
  )
}

export default Register;