import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './App.css'
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';



function App() {

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
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
