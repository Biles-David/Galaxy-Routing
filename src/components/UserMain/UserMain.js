import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import { getRoute, userRoute } from '../../ducks/reducers/routeReducer';
import { addPosition } from '../../ducks/reducers/userReducer';
import UserMap from '../UserMap/UserMap';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import ParticlesEffect from '../ParticlesEffect/ParticlesEffect';
import axios from 'axios';
import './UserMain.css';

class UserMain extends Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
  }

  componentDidMount() {
    this.props.userRoute(this.props.match.params.id)
  }

  // handleClick = () => {
  //   this.setState({ count: this.state.count + 1 })
  // }
  
  handleClick = () => {
    Swal.fire({
      title: 'Completed stop?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Stop Completed',
          text: 'Continue on your route.',
          type: 'success',
          timer: 800,
          showConfirmButton: false
        }).then(() => {
          let body = {
            route_id: this.props.route[this.props.position].route_id,
            location_id: this.props.route[this.props.position].location_id
          }
          // console.log(body)
          this.props.addPosition()
          axios.put('/api/routes/complete', body)
          this.setState({count: this.state.count + 1})
        })
      } else {
      }
    })
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
          <h2 className='userMain_title'>Galaxy Routing</h2>
          <div className='userMain'>
            <div className='info_empty_container'>
              {time}
              <h1>The Black Hole ate your Route.</h1>
              <p> You do not currently have a route.</p>
              <img src='/images/black-hole.jpg' alt='nothing' className='info_empty_container_img' />
            </div>
          </div>
        </div>
      )
    }
    if (!this.props.route[this.state.count]) {
      return (
        <div className='userMainBody'>
          <Sidebar />
          <ParticlesEffect />
          <h2 className='userMain_title'>Galaxy Routing</h2>
          <div className='userMain'>
            <div className='finished_container'>
              <h1>There are no more stops.</h1>
              <p>Ask your supervisor what to do next</p>
              <img className='finished_img' src='/images/satellite.jpeg' alt='satellite' />
            </div>
          </div>
        </div>
      )
    }
    let { route_name, address, city, state, zip, reasons, location_id, phone, lat, lng, user_id } = this.props.route[this.props.position || this.state.count]
    const fullAddress = `${address} ${city}, ${state}, ${zip}`
    const aLink = fullAddress.replace(/ /g, '+')
    if(this.props.route[this.props.position].reasons.includes('[Completed]') ) {
      this.props.addPosition()
    }
    return (
      <div className='userMainBody'>
        <Sidebar />
        <ParticlesEffect />
        <h2 className='userMain_title'>Galaxy Routing</h2>
        <div className='userMain'>
          <div className='infoContainer'>
            <p className='info_container_top'>{time} <button className='complete_stop_Btn' onClick={() => this.handleClick()}>Complete Stop</button> </p>
            <div>
              <div className='info_container_route_name'>
                <h3> Route: </h3>
                <p>{route_name} </p>
                <h3> Route Step: </h3>
                <p>{this.props.position + 1} of {this.props.route.length} </p>
              </div>
              <div className='info_container_store'>
                <h3>Location Id:</h3>
                <p>{location_id} </p>
                <h3>Phone: </h3>
                <p>{phone}</p>
              </div>
              <div className='info_container_user'>
                <h3> User: </h3>
                <p> {user_id} </p>
                <p>{this.props.userName} </p>
              </div>
            </div>
            <div className='info_container_notes'>
              <h1>Notes:</h1>
              <p>{reasons}</p>
            </div>
          </div>
          <div className='userMap-container'>
            <div className='userMap'>
              <a className='info_container_map_link' href={`https://www.google.com/maps/place/${aLink}`} rel="noopener noreferrer" target='_blank'>{fullAddress}</a>
              <UserMap location={{ lat: +lat, lng: +lng }} />
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
    isLoaded: state.route.isLoaded,
    userName: state.user.user.name,
    position: state.user.user.position
  }
}

export default connect(mapStateToProps, { getRoute, userRoute, addPosition })(UserMain);