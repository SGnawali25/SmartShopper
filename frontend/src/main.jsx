import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'

import { Provider } from 'react-redux';
import store from './store'
import {positions, transitions, Provider as AlertProvider} from'react-alert';
import AlertTemplate from'react-alert-template-basic';
import { GoogleOAuthProvider } from '@react-oauth/google'



const id = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
}

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <GoogleOAuthProvider clientId={id}>
        <App />
      </GoogleOAuthProvider>
    </AlertProvider>
  </Provider>,

  document.getElementById("root")
);
