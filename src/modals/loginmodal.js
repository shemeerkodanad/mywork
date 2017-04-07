import React, {Component} from 'react'
import { Modal, Button  } from 'react-bootstrap';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import FacebookLogin from 'react-facebook-login';

import {LoginActions} from '../redux/modules/Login/Login'
import LoginForm from '../Forms/LoginForm'
import SignForm from '../Forms/SignForm'

class LoginModal extends Component {
  componentWillReceiveProps(newProps){
    console.log(newProps)
  }
 responseFacebook = (response) => {
  console.log(response);
}

  close = () => {
  this.props.closeModal()
  }
  getSignin(){
    this.props.getSignin()
  }
  getLoginin(){
    this.props.getLogin()
  }

  render(){

    return(
        <Modal show={this.props.showModal} onHide={this.close}>
               <Modal.Header closeButton>
                 <Modal.Title>Login</Modal.Title>
               </Modal.Header>
               <Modal.Body>
               {!this.props.showsign && <div><LoginForm  doLogIn={this.props.doLogIn}/>
               <p> <span>OR </span> <a onClick={()=> this.getSignin()}>Sign in</a> </p>
               </div>
               }
               {this.props.showsign && <div><SignForm doSignIn={this.props.doSignIn} />
               <p> <span>OR </span> <a onClick={()=> this.getLoginin()}>LogIn</a> </p>
               </div>
               }
               {this.props.loginError !== null &&  <p>{this.props.loginError}</p> }
               <FacebookLogin
                        appId="1088597931155576"
                        autoLoad
                        callback={this.responseFacebook}
                        icon="fa-facebook"
                      />
               </Modal.Body>
               <Modal.Footer>
                 <Button onClick={this.close.bind(this)}>Close</Button>
               </Modal.Footer>
             </Modal>
    )
  }

}
const mapStateToProps = (state)=> {
  return{
    showModal : state.LoginReducers.loginModalShow,
    showsign :  state.LoginReducers.showsign,
    signedUser: state.LoginReducers.signedUser,
    loginError : state.LoginReducers.loginError
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    closeModal : () => LoginActions.closeLoginModal(),
    getSignin : () => LoginActions.getSignin(),
    getLogin: ()=> LoginActions.getLogin(),
    doSignIn: (user) => LoginActions.doSignIn(user),
    doLogIn: (user) => LoginActions.doLogIn(user)
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal)
