import React, {Component} from 'react'
import ContactForm from '../Components/ContactForm'
import {actions as contactActions} from '../redux/modules/Contact/Contact'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class ContactUs extends Component {

  render(){
    const {addContacts} = this.props
    return(
      <div>
      <h2>Contact Us</h2>
      <ContactForm addContacts={addContacts} />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return{
 myContacts : state.ContactReducer.contacts
  }
}
const mapDispatchToProps = (dispatch,ownProps) => {
  return bindActionCreators({
    addContacts :(data)=> contactActions.addMyContacts(data)

    },dispatch)

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactUs)
