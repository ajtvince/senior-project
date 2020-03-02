import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Navbar from "./components/navbar.component";
import BrowseProducts from "./components/browse-products.component";
import Home from "./components/home.component";


function App() {
  return (
    <Router>

      <Navbar />
      <Route path="/" exact component={Home} />
      <Route path="/products" component={BrowseProducts} />

    </Router>
  );
}

export default App;
