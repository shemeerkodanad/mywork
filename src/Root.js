import React from 'react';
import {Provider} from 'react-redux';
import App from './App';

export const Root = ({store}) => {

  return (
    <Provider store={store}>
    <App  store={store}/>
    </Provider>
  );
}

export default Root;
