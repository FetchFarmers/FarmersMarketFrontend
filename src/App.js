import './App.css';
import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Footer from './components/footer_components/Footer'
import AdminPage from './components/user_components/AdminPage';
import Reviews from './components/reviews_components/Reviews';
// import ReviewForm from './components/reviews_components/ReviewForm';
import SearchResults from './components/products_components/SearchResults';
import AboutUs from './components/footer_components/AboutUs';
import ContactUs from './components/footer_components/ContactUs';
import FAQ from './components/footer_components/FAQ';
import PageNotFound from './PageNotFound';
import Layout from './Layout';


function App() {
  const [cartItemTotal, setCartItemTotal] = useState(JSON.parse(window.localStorage.getItem("cartTotal") || 0));

  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Layout cartItemTotal={cartItemTotal} setCartItemTotal={setCartItemTotal} />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchResults cartItemTotal={cartItemTotal} setCartItemTotal={setCartItemTotal} />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="products/:productId/reviews" element={<Reviews />} />
          {/* <Route path="reviews" element={<ReviewForm token={token} setToken={setToken} />} /> */}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;





 
