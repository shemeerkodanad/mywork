import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ListComponent from '../Components/Listcomponent'


class List extends Component {

  render(){
    const {contactLists} = this.props
    return(
      <div className="container">
      <h2>Contact List</h2>
      <ListComponent contactLists={contactLists} />
      </div>
    )
  }
}
 const mapStateToProps = (state) => {
   return{
   contactLists : state.ContactReducer.contacts
}
 }
 const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({

   }
   )
 }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)
