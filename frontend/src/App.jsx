import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './App.css'

import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import ChangePassword from './components/user/ChangePassword';


import { loadUser } from './actions/userActions';
import store from './store'; 


function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  },[])

  return (
    <Router>
      <div className='App'>
        <Header />
        <div className='container container-fluid'>
          <Routes>
            <Route path='/' Component={Home} exact />
            <Route path='/search/:keyword' Component={Home} />
            <Route path='/product/:id' Component={ProductDetails} exact/>
            <Route path='/lgn' Component={Login} />
            <Route path='/register' Component={Register}/>
            <Route path='/me' Component={Profile} exact/>
            <Route path='/password/forgot' Component={ForgotPassword} />
            <Route path='/password/reset/:token' Component={NewPassword} />
            <Route path='/password/update' Component={ChangePassword} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
