import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'

import { Provider } from 'react-redux';
import store from './store'
import {positions, transitions, Provider as AlertProvider} from'react-alert';
import AlertTemplate from'react-alert-template-basic';
import { GoogleOAuthProvider } from '@react-oauth/google'


const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
}

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <GoogleOAuthProvider clientId="672585097063-i9odjr7fcq8qesj1h5b2bhddq9hp7tp2.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </AlertProvider>
  </Provider>,

  document.getElementById("root")
);
