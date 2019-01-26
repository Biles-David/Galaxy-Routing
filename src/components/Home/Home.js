import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className='homeDiv'>
      <div className='homeBody'>
        <h1 className='homeTitle'> Galaxy Routing </h1>
        <div className='homeBtn'>
          <Link to='/login' className='link'> <button className='homeLogin'>Login</button> </Link>
          <Link to='/register' className='link'> <button className='homeReg'>Register</button> </Link>
        </div>
      </div>
    </div>
  )
}

export default Home