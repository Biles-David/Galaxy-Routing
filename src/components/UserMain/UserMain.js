import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import { getRoute, userRoute } from '../../ducks/reducers/routeReducer';
import UserMap from '../UserMap/UserMap';
import ParticlesEffect from '../ParticlesEffect/ParticlesEffect';
import './UserMain.css';

class UserMain extends Component {
  constructor() {
    super()
    this.state = {
      count: 0,
    }
  }

  componentDidMount() {
    this.props.userRoute(this.props.match.params.id)
  }

  handleClick = () => {
    this.setState({count: this.state.count + 1})
  }

  render() {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const numbers = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st'];
    let currentTimeDate = new Date();
    let time = `${days[currentTimeDate.getDay()]}  ${month[currentTimeDate.getMonth()]} ${numbers[currentTimeDate.getDate() - 1]}, ${currentTimeDate.getFullYear()} `
    let { isLoaded } = this.props
    if (!isLoaded) {
      return (
        <div>
          Loading...
        </div>
      )
    }
    if (!this.props.route[0]) {
      return (
        <div className='userMainBody'>
          <Sidebar />
          <ParticlesEffect />
          <div className='userMain'>
            <div className='info_empty_container'>
              {time}
              <h1>The Black Hole ate your Route.</h1>
              <p> You do not currently have a route.</p>
              <img src='/black-hole.jpg' alt='nothing' className='info_empty_container_img' />
            </div>
          </div>
        </div>
      )
    }
    if(!this.props.route[this.state.count]){
      return(
        <div className='userMainBody'>
        <Sidebar />
        <ParticlesEffect />
        <div className='userMain'>
          <div className='finished_container'>
            <h1>There are no more stops.</h1>
            <p>Ask your supervisor what to do next</p>
            <img className='finished_img' src='/satellite.jpeg' alt='satellite'/>
          </div>
        </div>
      </div>
      )
    }
    let { address, city, state, zip, reasons, location_id, phone, lat, lng } = this.props.route[this.state.count]
    const fullAddress = `${address} ${city}, ${state}, ${zip}`
    const aLink  = fullAddress.replace(/ /g, '+' )
    return (
      <div className='userMainBody'>
        <Sidebar />
        <ParticlesEffect />
        <div className='userMain'>
          <div className='infoContainer'>
            <p className='info_container_top'>{time} <button className='complete_stop_Btn' onClick={() => this.handleClick()}>Complete Stop</button> </p>
            <div>
            </div>
            <p>Notes: {reasons}</p>
          </div>
          <div className='userMap-container'>
            <div className='userMap'>
              <a className='info_container_map_link' href={`https://www.google.com/maps/place/${aLink}`} rel="noopener noreferrer" target='_blank'>{fullAddress}</a>
              <UserMap location={{lat: +lat, lng: +lng}} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    route: state.route.userRoute,
    isLoaded: state.route.isLoaded
  }
}

export default connect(mapStateToProps, { getRoute, userRoute })(UserMain);