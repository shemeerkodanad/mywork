import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux'

import {LoginActions} from './redux/modules/Login/Login'
import MainLayout from './MainLayout/Mainlayout';
import Home from './Containers/Home';
import EchartComponent from './Containers/EchartComponent';
import ContactUs from './Containers/ContactUs'
import List from './Containers/List'
import LoginModal from './modals/loginmodal'


import './App.css';

class App extends Component {
  componentWillMount(){
    this.props.loadUserFromToken();
  }
  render() {
    const {resetMe, store} =this.props
    return (
      <Router>
      <div>
       <MainLayout logout={resetMe} />
       <LoginModal  />
       <Route  exact  path="/" component={Home} />
       <Route path="/home" component={Home} />
       <Route onEnter={requireAuth(store)} component={DefaultLayout} >
       <Route path="/echarts" component={EchartComponent} />
       <Route path="/contact-us" component={ContactUs} />
       <Route path="/lists" component={List} />
       </Route>
    </div>
      </Router>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
 return {
  loadUserFromToken: () => {
   let token = sessionStorage.getItem('jwtToken');
   if(!token || token === '') {//if there is no token, dont bother
    return;
   }
  //fetch user from token (if server deems it’s valid token)
  dispatch(LoginActions.meFromToken(token))
  .then((response) => {
   if (!response.error) {
    //store token
    sessionStorage.setItem('jwtToken', response.payload.data.token);
  //  dispatch(meFromTokenSuccess(response.payload))
   } else {
    //remove token from storage
    sessionStorage.removeItem('jwtToken');
    //dispatch(meFromTokenFailure(response.payload));
   }
  });
 },
 resetMe: () =>{ // logout
 sessionStorage.removeItem('jwtToken'); //remove token from storage
 console.log('logoutreachhere')
   dispatch(LoginActions.resetToken());
 }
 }
}

export default connect(
  null,
  mapDispatchToProps
)(App);
