import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import store from './ducks/store'
import router from './router';

class App extends Component {
  state = {
    isLoaded: false,
    user: {}
  }

  componentDidMount(){
    axios('/users/session').then(response => {
      this.setState({user: response.data, isLoaded:true})
      // console.log(response.data)
    })
    this.setState({isLoaded: true})
  }

  render() {
    if(!this.state.isLoaded){
      return (
        <div>
          Loading...
        </div>
      )
    }
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navbar user={this.state.user} isLoaded={this.state.isLoaded}/>
            {router}
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
