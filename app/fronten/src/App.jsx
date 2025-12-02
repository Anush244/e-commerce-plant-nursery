import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from './components/LoginRegister';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import PlaceOrder from './components/PlaceOrder';
import Nav from './components/Nav';
import Home from './components/home';
import Indoor from './components/order';
import ProductModal from './components/productmodel';
import Guide from './components/PlantGuide';
import Contact from './components/Contact';
import About from './components/About';
import HelpPage from './components/Help';
import OffersPage from './components/offer';
import Feedback from './components/feedback';
// import Search from './components/search'
import ProductDetail from './components/Productdetail';
import { CartProvider } from "./components/CartContext"; 
function App() {
  return (
    <CartProvider>
      <Router>
        <Nav />

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/product' element={<ProductPage />} />
          <Route path='/cart' element={<CartPage />} />
          {/* <Route path='/order' element={<PlaceOrder />} /> */}
          <Route path='/login' element={<LoginRegister />} />
          <Route path='/register' element={<LoginRegister />} />
          <Route path='/order' element={<Indoor />} />
          <Route path='/model' element={<ProductModal />} />
          <Route path='/guide' element={<Guide />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/help' element={<HelpPage />} />
          <Route path='/offers' element={<OffersPage />} />
          <Route path='/feedback' element={<Feedback />} />
           {/* <Route path="/search" element={<Search />} /> */}
            <Route path="/product/:name" element={<ProductDetail />} />
            
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
