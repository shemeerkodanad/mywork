import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Icon, Modal } from 'antd';
import 'antd/dist/antd.css';
const confirm = Modal.confirm;

const logOut = () => {
let confm = confirm('Are You Going to Logout?')

  if(confm){
    Navigation.LogOUt()
//  sessionStorage.removeItem('jwtToken');
  }
}



class Navigation extends React.Component {

  openLoginModal(){
    this.props.openLoginModal()
  }



 LogOut() {
 const {logout} = this.props
   confirm({
     title: 'Want to realy logout?',
     content: '',
     okText: 'OK',
    cancelText: 'Cancel',
     onOk() {
            logout()
            },
     onCancel() {},
   });


 }
  render(){
    const {signedUser} = this.props
    const menu = (
      <Menu>
        <Menu.Item>
          <a>profile</a>
        </Menu.Item>
        <Menu.Item>
          <a onClick = {() => this.LogOut()}  >Logout</a>
        </Menu.Item>
      </Menu>
    );
    return(

      <div className="nav">
      <ul>
      <li><Link to="/home" >Home</Link></li>
      <li><Link to="/echarts" >Echarts</Link></li>
      <li><Link to="/contact-us" >Contact Us</Link></li>
      <li><Link to="/lists" >List</Link></li>
      {signedUser !== null && <li className="login-link" >
      <Dropdown overlay={menu}>
         <a className="ant-dropdown-link" href="#">
           {signedUser} <Icon type="down" />
         </a>
       </Dropdown></li>}
        {signedUser === null &&
      <li className="login-link" onClick= {()=> this.openLoginModal() }>Login</li>
    }
      </ul>
      </div>
      

    )
  }

}
export default Navigation
