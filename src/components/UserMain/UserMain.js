import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import { getRoute } from '../../ducks/reducers/routeReducer';
import UserMap from '../UserMap/UserMap';
import ParticlesEffect from '../ParticlesEffect/ParticlesEffect';
import './UserMain.css';

class UserMain extends Component {
  constructor(){
    super()
    this.state = {
      count: 0
    }
  }


  componentDidMount(){
    this.props.getRoute(this.props.match.params.id)
  }

  render() { 
    console.log('this.props.route.route: ', this.props.route.route)
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const numbers = ['1st', '2nd', '3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th','13th','14th','15th','16th','17th','18th','19th','20th','21st','22nd','23rd','24th','25th','26th','27th','28th','29th','30th','31st'];
    let currentTimeDate = new Date();
    let time = `${days[currentTimeDate.getDay()]}  ${month[currentTimeDate.getMonth()]} ${numbers[currentTimeDate.getDate() - 1]}, ${currentTimeDate.getFullYear()} `
    let { isLoaded } = this.props.route
    if(!isLoaded){
      return(
        <div>
          Loading...
        </div>
      )
    }
    if(!this.props.route.route.data[0]){
      return(
        <div className='userMainBody'>
          <Sidebar/>
          <ParticlesEffect/>
          <div className='userMain'>
            {time}
            <button onClick={()=> this.setState({count: this.state.count++})}>Complete Stop</button>
            <h1>You do not have a Route</h1>
            <div className='userMap-container'>
              <div className='userMap'>
                <UserMap count={this.state.count}/>
              </div>
            </div>
          </div>
        </div>
      )
    }
    const { reasons, location_id, lat, lng } = this.props.route.route.data[0]
    return (
      <div className='userMainBody'>
        <Sidebar/>
        <ParticlesEffect/>
        <div className='userMain'>
          {time}
          <button onClick={()=> this.setState({count: this.state.count++})}>Complete Stop</button>
          <h1>{`${lat} ${lng}`}</h1>
          <h1>{reasons}</h1>
          <div className='userMap-container'>
            <div className='userMap'>
              <UserMap count={this.state.count}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state

export default connect( mapStateToProps, { getRoute } )(UserMain);