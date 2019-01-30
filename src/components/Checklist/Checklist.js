import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getChecklist, addToChecklist, deleteItem } from '../../ducks/reducers/listReducer';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import ParticleEffect from '../ParticlesEffect/ParticlesEffect';
import './Checklist.css'

class Checklist extends Component {
  constructor(){
    super()
    this.state={
      content: '',
      add: false,
      canDelete: false
    }
  }

  componentDidMount(){
    this.props.getChecklist()
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleAdd = (text) => {
    let body = {content: text}
    this.props.addToChecklist(body)
    this.setState({add: false})
  }

  handleClick = () => {
    this.setState({add:true})
  }

  updateDelete = () => {
    this.setState({canDelete: true})
  }

  handleCancel = () => {
    this.setState({canDelete: false, add: false})
  }

  handleDelete = (id) => {
    this.props.deleteItem(id)
    this.setState({canDelete: false})
  }

  render() { 
    console.log(this.props)
    const checklist = this.props.list.map( (e, i) => {
      return (
        <div key={e.id} className='listItems'>
          <div className='listItem_div'>
            <input name='content' type='checkbox'></input>
            <h2>{e.content}</h2>
          </div>
          { this.state.canDelete && <div name={i} className='checklist_delete' onClick={() => this.handleDelete(e.id)}>X</div>}
        </div>
      )
    })
    return (
      <div className='checklistDiv'>
        <Navbar/>
        <Sidebar/>
        <ParticleEffect/>
        <h2 className='checklist_title'>Galaxy Routing</h2>
        <div className='checklistMain'>
          <h1>Checklist</h1>
          <div>
            {checklist}
          </div>
          {
          this.props.user.admin === true && 
          <div className='checklist_admin'>
            {!this.state.canDelete && <button onClick={() => this.handleClick()}>Add</button>}
            {(this.state.add || this.state.canDelete) && <button onClick={() => this.handleCancel()}> Cancel </button>}
            {!this.state.add && <button onClick={() => this.updateDelete()}> Delete </button>}
          </div>
          }
          {this.state.add && 
            <div className='checklist_add'>
              <input name='content' onChange={this.handleChange}></input>
              <button className='checklist_submit' onClick={() => this.handleAdd(this.state.content)}> Submit </button>
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.list.list,
    user: state.user.user
  }
}

export default connect(mapStateToProps, {getChecklist, addToChecklist, deleteItem})(Checklist);