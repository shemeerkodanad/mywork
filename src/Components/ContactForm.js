import React, {Component} from 'react'
import {Field, reduxForm } from 'redux-form'
import RenderField from './RenderField'

class ContactForm extends Component {
  myOwnFunction(event){

    console.log(event)
    this.props.addContacts(event)
    this.props.reset()
  }

  render(){
 const {handleSubmit, submitting, reset, submitSucceeded} = this.props
     return(
       <div className="my-contact-form">
       <form onSubmit={handleSubmit(this.myOwnFunction.bind(this))} >
       <Field name="firstname" type="text" label="FirstName" component={RenderField}  />
       <Field name="lastname" type="text" label="LastName" component={RenderField}  />
       <Field name="email" type="email" label="Email" component={RenderField}  />
       <button className="my-contact-button" type="submit" disabled={submitting}>submit</button>
       {submitSucceeded && <p>Contact added successfully!!</p>}
       </form>
       </div>

     )
  }
}
const validate = values => {
  const errors = {}
  if (!values.firstname) {
    errors.firstname = 'Required'
  } else if (values.firstname.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.lastname) {
    errors.lastname = 'Required'
  } else if (values.lastname.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

ContactForm = reduxForm({
  form: 'contact',
  validate
  })(ContactForm)
export default ContactForm;
