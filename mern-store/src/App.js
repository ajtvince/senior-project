import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Navbar from "./components/navbar.component";
import BrowseProducts from "./components/browse-products.component";
import Home from "./components/home.component";
import Login from "./components/login.component";
import Cart from "./components/cart.component";
import Signup from "./components/signup.component";
import Checkout from "./components/checkout.component";

function App() {

  
  return (
    <Router>

      <Navbar />
      <Route path="/" exact component={Home} />
      <Route path="/products" component={BrowseProducts} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />

    </Router>
  );
}

export default App;
