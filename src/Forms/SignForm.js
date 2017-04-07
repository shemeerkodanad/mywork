import React, {Component} from 'react'

 import {reduxForm, Field} from 'redux-form'
 import RenderField from '../Components/RenderField'

 class SignForm extends Component {

   signin = (event)=> {

    this.props.doSignIn(event)
   }

   render(){
   const {handleSubmit, submitting, submitSucceeded } = this.props
     return(
      <div>
     <form onSubmit={handleSubmit(this.signin)} >
     <Field name='email' type='email' label='Email' component={RenderField} />
     <Field name='uname' type='text' label='Firstname' component={RenderField} />
     <Field name='password' type="password" label='password' component={RenderField} />
     <button className="my-contact-button" type="submit" disabled={submitting}>Sign in</button>
     </form>
      </div>

     )
   }

 }

 SignForm = reduxForm({
  form  : 'signin'
})(SignForm)
 export default SignForm
