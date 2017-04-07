import React from 'react';
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'

import Navigation from '../Components/Navigation'
import HomeHeader from '../Containers/HomeHeader'
import { LoginActions } from '../redux/modules/Login/Login'

class MainLayout extends React.Component {
  render(){
    const {signedUser,openLoginModal, logout}  = this.props
    return(
      <header>
      {signedUser == null && <HomeHeader />  }
    {signedUser !== null &&  <Navigation openLoginModal={openLoginModal} signedUser={signedUser} logout={logout}  />}
    </header>
      )
  }
}



const mapStateToProps = (state) => {
  return {
    signedUser: state.LoginReducers.signedUser
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
 return bindActionCreators({
   openLoginModal : () => LoginActions.openLoginModal()

 },dispatch)

}

export default connect(
mapStateToProps,
mapDispatchToProps

)(MainLayout)
