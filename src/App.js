import './App.css';
import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Footer from './components/footer_components/Footer'
import AdminPage from './components/user_components/AdminPage';
// import ReviewForm from './components/reviews_components/ReviewForm';
import SearchResults from './components/products_components/SearchResults';
import AboutUs from './components/footer_components/AboutUs';
import ContactUs from './components/footer_components/ContactUs';
import FAQ from './components/footer_components/FAQ';
import PageNotFound from './PageNotFound';
import Header from './components/Header';
import CartIndex from './components/cart_components/CartIndex';
import User from './components/user_components/User';

// import ProductDetails from './ProductDetails';

import Bakery from './components/products_components/bakery_components/Bakery';
import BreadProducts from './components/products_components/bakery_components/subcats/Bread';
import DessertProducts from './components/products_components/bakery_components/subcats/Desserts';
import GlutenFreeVeganProducts from './components/products_components/bakery_components/subcats/GlutenFreeVegan';
import SavoryProducts from './components/products_components/bakery_components/subcats/Savory';
import SeasonalProducts from './components/products_components/bakery_components/subcats/Seasonal';

import Dairy from './components/products_components/dairy_components/Dairy';
import CheeseProducts from './components/products_components/dairy_components/subcats/Cheese';
import MilkProducts from './components/products_components/dairy_components/subcats/Milk'
import YogurtProducts from './components/products_components/dairy_components/subcats/Yogurt'
import EggsButterProducts from './components/products_components/dairy_components/subcats/EggsButter'


import Produce from './components/products_components/produce_components/Produce';
import Fruit from './components/products_components/produce_components/subcats/Fruit';
import Vegetables from './components/products_components/produce_components/subcats/Vegetables';

import MeatAndSeafood from './components/products_components/meat_seafood_components/MeatAndSeafood';
import BeefProducts from './components/products_components/meat_seafood_components/subcats/Beef';
import DeliProducts from './components/products_components/meat_seafood_components/subcats/Deli'
import LambProducts from './components/products_components/meat_seafood_components/subcats/Lamb'
import PoultryProducts from './components/products_components/meat_seafood_components/subcats/Poultry'
import PorkProducts from './components/products_components/meat_seafood_components/subcats/Pork'
import SeafoodProducts from './components/products_components/meat_seafood_components/subcats/Seafood'
import ProductDetails from './components/products_components/ProductDetails';

function App() {
  const [cartItemTotal, setCartItemTotal] = useState(JSON.parse(window.localStorage.getItem("cartTotal") || 0));

  return (
    <div className="App">
            <Header cartItemTotal={cartItemTotal} setCartItemTotal={setCartItemTotal} />
      <User setCartItemTotal={setCartItemTotal} />
      <CartIndex setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal} />
      <Routes>
      <Route path="/products/bakery" element={ <Bakery setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/bread" element={ <BreadProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/pastries_desserts" element={ <DessertProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/glutenfree_vegan" element={ <GlutenFreeVeganProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/>} />
              <Route path="/products/savory_baked_goods" element={ <SavoryProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } /> 
              <Route path="/products/seasonal" element={ <SeasonalProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } /> 

            <Route path="/products/meat_seafood" element={ <MeatAndSeafood setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/beef" element={ <BeefProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/deli" element={ <DeliProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/lamb" element={ <LambProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/poultry" element={ <PoultryProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } /> 
              <Route path="/products/pork" element={ <PorkProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } /> 
              <Route path="/products/seafood" element={ <SeafoodProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } /> 

            <Route path="/products/dairy" element={ <Dairy setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/cheese" element={ <CheeseProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/eggs_butter" element={ <EggsButterProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/milk" element={ <MilkProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/yogurt" element={ <YogurtProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } /> 

            <Route path="/products/produce" element={ <Produce setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/fruit" element={ <Fruit setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/vegetables" element={ <Vegetables setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />

              <Route path="/products/:id" element={<ProductDetails setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/>} />
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchResults cartItemTotal={cartItemTotal} setCartItemTotal={setCartItemTotal} />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="admin" element={<AdminPage />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;





 
