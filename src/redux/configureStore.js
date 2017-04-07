import { createStore,  applyMiddleware, combineReducers} from 'redux'
import { middleware as reduxPackMiddleware } from 'redux-pack'
import {reducers }  from './modules/Echarts/Echarts'
import { ContactReducer } from './modules/Contact/Contact'
import { LoginReducers } from './modules/Login/Login'
import { reducer as formReducer } from 'redux-form'
import io from 'socket.io-client'
let socket = io(`http://localhost:8080`)

export const configureStore = () => {
   const apiMiddleWare = store => next => action =>{
      if(!action.meta || action.meta.type !== 'api'){
       return next(action);
      }

        //const socket = io.connect(url);
        console.log(store.getState())
        const {reducers :{mychartdata :{bar : myValue}}} = store.getState()
        console.log(myValue);
        if(Object.keys(myValue).length === 0){
          socket = io(`http://localhost:8080`) ;
        }

      socket.on('message', function (data) {
        console.log("socket")
       if(data.message) {
        console.log(data.message)
        let newAction = Object.assign({}, action, {payload: data.message});
        delete newAction.meta;
        store.dispatch(newAction);
       }
     });

   }

   const rootReducer = {
      reducers,
      ContactReducer,
      LoginReducers,
     form: formReducer

   }
   const reducer = combineReducers(rootReducer)
   const store = createStore(reducer,applyMiddleware(apiMiddleWare , reduxPackMiddleware));

  // const action = {Echarts:bindActionCreators(Echarts.actions, store.dispatch)};
   return store

}
export default configureStore;
