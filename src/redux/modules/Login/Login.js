import axios from 'axios'
import { handle } from 'redux-pack';
const types = {
  OPEN_LOGIN_MODAL : 'OPEN_LOGIN_MODAL',
  CLOSE_LOGIN_MODAL : 'CLOSE_LOGIN_MODAL',
  LOGIN             :  'LOGIN',
  GETSIGNLINK : 'GETSIGNLINK',
  GETLOGINLINK :'GETLOGINLINK',
  DOSIGN  : 'DOSIGN',
  DOLOGIN  : 'DOLOGIN',
  LOGINSUCCESS : 'LOGINSUCCESS',
  RECHECKTOKEN : 'RECHECKTOKEN',
  RESETTOKEN :  'RESETTOKEN'
}

const initialState = {
loginModalShow : false,
users: [{uname:'shemeer',password:'qwerty'},{uname:'shibili',password:'asdfgh'}],
showsign: false,
sigining: false,
signError: null,
loginError: null,
signedUser : null,
userToken: null
}
export const LoginActions =  {
  openLoginModal: () => {
    return {
      type: types.OPEN_LOGIN_MODAL
    }
  },
  closeLoginModal: () => {
    return {
      type: types.CLOSE_LOGIN_MODAL
    }
  },
  login : (user) => {
    return {
      type:types.LOGIN
    }
  },
  getSignin: () => {
    return {
      type:types.GETSIGNLINK
    }
  },
  getLogin: () => {
    return {
      type:types.GETLOGINLINK
    }
  },
  doSignIn: (user) => {
    return {
      type:types.DOSIGN,
      promise: axios.post('http://localhost:8080/api/users/register', {
                uname: user.uname,
                email: user.email,
                password: user.password
           }),
      meta :{
        onSuccess: (response) => console.log(response)
      }
    };
  },
  doLogIn: (user) => {
     return {
       type :types.DOLOGIN,
       promise: axios.post('http://localhost:8080/api/users/login',{
           email:user. email,
           password: user.password
                }),
      meta : {
        onSuccess: (response) =>{
          console.log(response)
        },
        onFailure: (response) => {
            console.log(response)
        }
      }
    };
  },
  meFromToken:(token) => {
    return{
     type :types.RECHECKTOKEN,
     promise: axios.post('http://localhost:8080/api/users/verfytoken',{
       token :token
     })
}
  },
  resetToken:() => {
    return {
      type: types.RESETTOKEN
    }

  }
}
export const LoginReducers = (state = initialState, action) => {
   switch(action.type){
     case types.OPEN_LOGIN_MODAL:
     return {...state,  loginModalShow : true , loginError:null ,signError: null  }
     case types.CLOSE_LOGIN_MODAL:
     return {...state , loginModalShow : false}
     case types.GETSIGNLINK :
     return {...state, showsign: true }
     case types.GETLOGINLINK:
     return {...state, showsign: false }
     case types.DOSIGN :
     return handle(state, action, {
           start : prevState => ({ ...prevState, sigining:true }),
           finish :prevState => ({ ...prevState, sigining:false}),
           failure: prevState => ({ ...prevState, signError: action.payload}),
           success : prevState => ({ ...prevState , showsign: false })

     });
     case types.DOLOGIN :
     return handle(state, action, {
       start: prevState =>({...prevState, logining: true}),
       finish: prevState => ({...prevState, logining: false}),
       failure: prevState => {
            return {...prevState, loginError: action.payload.response.data.message}
       },
       success : prevState => {
         const  userToken = action.payload.data.serverToken
         const username = action.payload.data.user.uname
          sessionStorage.setItem('jwtToken', userToken);
         return { ...prevState ,userToken:userToken,signedUser:username,loginModalShow : false   }
         }
     });
     case types.RECHECKTOKEN :
      return handle(state, action, {
        start: prevState => ({...prevState}),
        finish: prevState => ({...prevState}),
        failure: prevState => ({...prevState}),
        success: prevState => {
          console.log(action.payload)
        const  userToken = action.payload.data.token
          const username = action.payload.data.user.name

         return  {...prevState, userToken:userToken,signedUser:username}
        }
      })
    case types.RESETTOKEN :
    return {...state, signedUser : null,  userToken: null}
      default :
     return state
   }



}
