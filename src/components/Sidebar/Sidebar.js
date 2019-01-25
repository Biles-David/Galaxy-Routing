import React, { Component } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { Redirect, context } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../../ducks/reducers/userReducer';
import Logout from '../Logout/Logout';
import './Sidebar.css';

// const Sidebar = props => {
//   return (
//     <div className='sidebarMain'>
//       <h1>Menu</h1>
//       <div className='sidebarList'>
//         <Logout className='sidebarLink'/>
//       </div>
//     </div>
//   )
// }

// export default Sidebar;

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logout: false
    }
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
        }
        )
      }
    })
  }

  render() {
    return (
      <div className='sidebarMain'>
        <h1>Menu</h1>
        {/* <button onClick={() => this.handleClick()}>Click Me!</button> */}
      </div>
    );
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { logout })(Sidebar);