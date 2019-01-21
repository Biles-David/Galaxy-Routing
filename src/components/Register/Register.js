import React, { Component } from 'react';
import { storage } from '../../firebase/index'
import { connect } from 'react-redux';
import { addUser } from '../../ducks/reducers/userReducer';
import './Register.css';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      img: null,
      url: null,
      password: '',
      passwordCheck: '',
      user: {}
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.img !== this.state.img) {
      const uploadTask = storage.ref(`images/profile/preview/${this.state.img.name}`).put(this.state.img);
      uploadTask.on('state_changed',
        (snapshot) => {
          // Progress function...
        },
        (error) => { console.log(error) },
        () => {
          //Complete function...
          storage.ref('images').child(this.state.img.name).getDownloadURL().then(url => {
            console.log(url)
            this.setState({ url })
          })
        }
      );
    }
  }

  handleImageChange = e => {
    if (e.target.files[0]) {
      this.setState({
        img: e.target.files[0]
      })
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = () => {
    const { name, email, url, password, passwordCheck } = this.state;
    if (password !== passwordCheck) {
      window.alert("Passwords don't match")
      return (
        null
      )
    } else {
      if (this.state.img) {
        const uploadTask = storage.ref(`images/profile/${this.state.email}`).put(this.state.img);
        uploadTask.on('state_changed',
          (snapshot) => {
            // Progress function...
          },
          (error) => { console.log(error) },
          () => {
            //Complete function...
            storage.ref('images').child(this.state.img.name).getDownloadURL().then(url => {
              console.log(url)
              this.setState({ url })
            })
          }
        );
      }
      const user = { name, email, img: url || null, password }
      this.props.addUser(user).then( response => {
        // this.setState({user: response.value.data})
      })
    }
  }

  render() {
    const fakeImg = 'https://www.awwu.biz/Home/ShowPublishedImage/743/636705502595800000'
    return (
      <div className='registerBody'>
        <div className='registerDiv'>
          <h1>Register</h1>
          <div className='imgDiv'>
            <img className='registerImg' src={this.state.url || fakeImg} alt='Profile' />
            <input type='file' onChange={this.handleImageChange} className='fileUpload' />
            <p className='addPhoto'> {this.state.url ? 'Click to change' : 'Click to add Photo'} </p>
          </div>
          {/* <button onClick={() => this.handleUpload()}>Upload</button> */}
          <div className='register_inputDiv'>
            <input name='name' type='text' placeholder='Name' onChange={this.handleChange}></input>
            <input name='email' type='text' placeholder='E-mail' onChange={this.handleChange}></input>
            <input name='password' type='password' placeholder='Password' onChange={this.handleChange}></input>
            <input name='passwordCheck' type='password' placeholder='Confirm Password' onChange={this.handleChange}></input>
          </div>
          <button onClick={() => this.props.handleClick()}>Cancel</button>
          <button onClick={() => this.handleSubmit()}>Submit!</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { addUser })(Register);