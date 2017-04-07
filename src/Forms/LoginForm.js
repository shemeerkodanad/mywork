import React, {Component} from 'react'

 import {reduxForm, Field} from 'redux-form'
 import RenderField from '../Components/RenderField'

 class LoginForm extends Component {

   login = (event)=> {

     console.log(event);
     this.props.doLogIn(event)
   }

   render(){
   const {handleSubmit, submitting, submitSucceeded } = this.props
     return(
      <div>
     <form onSubmit={handleSubmit(this.login)} >
     <Field name='email' type='email' label='Email' component={RenderField} />
     <Field name='password' type="password" label='password' component={RenderField} />
     <button className="my-contact-button" type="submit" disabled={submitting}>login</button>
     </form>
      </div>

     )
   }

 }

 LoginForm = reduxForm({
  form  : 'login'
})(LoginForm)
 export default LoginForm
