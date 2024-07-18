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
import ChangePassword from './components/user/ChangePassword';

import NewProduct from './components/admin/NewProduct'

import ListOrders from './components/order/ListOrders';

import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';

import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

import { loadUser } from './actions/userActions';
import store from './store'; 
import Dashboard from './components/admin/Dashboard';
import UsersList from './components/admin/UsersList';
import ProductsList from './components/admin/ProductsList';
import UpdateProduct from './components/admin/UpdateProduct';
import UpdateUser from './components/admin/UpdateUser';
import ConfirmOrder from './components/cart/ConfirmOrder';
import OrderSuccess from './components/cart/OrderSuccess';
import Payment from './components/cart/Payment';
import OrdersList from './components/admin/OrdersList';
import ProcessOrder from './components/admin/ProcessOrder';
import ProductReviews from './components/admin/ProductReviews';
import UpdateProfile from './components/user/UpdateProfile';
import OrderDetails from './components/order/OrderDetails';


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
            <Route path='/lgn' Component={Login} />
            <Route path='/register' Component={Register}/>
            <Route path='/product/:id' Component={ProductDetails} exact/>
            <Route path='/me' Component={Profile} exact/>
            <Route path='/me/update' Component={UpdateProfile} exact/>
            <Route path='/password/update' Component={ChangePassword} />
            <Route path='/admin/product' Component={NewProduct} exact/>
            <Route path="/orders/me" Component={ListOrders} exact />
            <Route path="/order/:id" Component={OrderDetails} exact />

            <Route path='/cart' Component={Cart} exact/>
            <Route path='/shipping' Component={Shipping} exact/>
            <Route path='/confirm' Component={ConfirmOrder} exact/>
            <Route path='/success' Component={OrderSuccess} exact/>
            <Route path='/payment' Component={Payment} exact/>

            <Route path='/password/forgot' Component={ForgotPassword} />
            <Route path='/password/reset/:token' Component={NewPassword} />

            <Route path="/dashboard" Component={Dashboard} exact/>
            <Route path="/admin/users" Component={UsersList} exact/>
            <Route path="/admin/products" Component={ProductsList} exact/>
            <Route path="/admin/product/:id" Component={UpdateProduct} exact/>
            <Route path="/admin/user/:id" Component={UpdateUser} exact/>
            <Route path="/admin/orders" Component={OrdersList} exact/>
            <Route path="/admin/order/:id" Component={ProcessOrder} exact/>
            <Route path="/admin/reviews" Component={ProductReviews} exact/>
            

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
