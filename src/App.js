import './App.css';
import React, { useState } from "react";
import {Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import Header from './components/Header';
import Products from './components/Products_components/Products';
import User from './components/User_Components/User';
import Cart from './components/Cart_components/Cart';

function App() {

  return (
    <div className="App">
      <Header/>
      <Products/>
      <User/>
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/my_cart" element={ <Cart/> } />
      </Routes>
    </div>
  );
}

export default App;
