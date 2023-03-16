import './App.css';
import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Header from './components/Header';
import Footer from './components/footer_components/Footer'
import Products from './components/products_components/Products';
import User from './components/user_components/User';
import AdminPage from './components/user_components/AdminPage';
import Reviews from './components/reviews_components/Reviews';
// import ReviewForm from './components/reviews_components/ReviewForm';
import SearchBar from './components/products_components/SearchBar';
import SearchResults from './components/products_components/SearchResults';
import AboutUs from './components/footer_components/AboutUs';
import ContactUs from './components/footer_components/ContactUs';
import FAQ from './components/footer_components/FAQ';
import CartIndex from './components/cart_components/CartIndex';
import PageNotFound from './PageNotFound';
import Layout from './Layout';


function App() {
  const [cartItemTotal, setCartItemTotal] = useState(JSON.parse(window.localStorage.getItem("cartTotal") || 0));
  const [token, setToken] = useState('');

  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Layout cartItemTotal={cartItemTotal} setCartItemTotal={setCartItemTotal} token={token} setToken={setToken} />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchResults cartItemTotal={cartItemTotal} setCartItemTotal={setCartItemTotal} />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="products/:productId/reviews" element={<Reviews token={token} />} />
          {/* <Route path="reviews" element={<ReviewForm token={token} setToken={setToken} />} /> */}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;



// import './App.css';
// import React, { useState } from "react";
// import {Routes, Route} from 'react-router-dom';
// import HomePage from './components/HomePage';
// import Header from './components/Header';
// import Footer from './components/Footer'
// import Products from './components/products_components/Products';
// import User from './components/user_components/User';
// import AdminPage from './components/user_components/AdminPage';
// import Reviews from './components/reviews_components/Reviews';
// import ReviewForm from './components/reviews_components/ReviewForm';
// import SearchBar from './components/products_components/SearchBar';
// import SearchResults from './components/products_components/SearchResults';
// import AboutUs from './components/products_components/AboutUs';
// import ContactUs from './components/products_components/ContactUs';
// import FAQ from './components/products_components/FAQ';
// import CartIndex from './components/cart_components/CartIndex';


// function App() {
//   const [cartItemTotal, setCartItemTotal] = useState(JSON.parse(window.localStorage.getItem("cartTotal")||0))

//   return (
//     <div className="App">
//       <Header cartItemTotal={cartItemTotal} setCartItemTotal={setCartItemTotal}/>
//       <Products setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/>
//       <User setCartItemTotal={setCartItemTotal}/>
//       <CartIndex setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal} />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/" element={<SearchBar />} />
//         <Route path="/search" element={<SearchResults cartItemTotal={cartItemTotal} setCartItemTotal={setCartItemTotal}/>} />
//         <Route path="/about" element={<AboutUs />} />
//         <Route path="/contact" element={<ContactUs />} />
//         <Route path="/faq" element={<FAQ />} />
//         <Route path="/admin" element={<AdminPage />} />
//         <Route path="/reviews" element={<ReviewForm />} />
//         <Route path="/products/:productId/reviews" element={<Reviews />} />
//       </Routes>
//       <Footer />
//     </div>
//   );
// }


// export default App;





 
