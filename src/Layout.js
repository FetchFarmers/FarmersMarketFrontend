import React from 'react';
import Header from './components/Header';
import Products from './components/products_components/Products';
import User from './components/user_components/User';
import CartIndex from './components/cart_components/CartIndex';
import Reviews from './components/reviews_components/Reviews';
import { Outlet, useParams } from 'react-router-dom';

function Layout({ cartItemTotal, setCartItemTotal }) {
  const { productId } = useParams();

  return (
    <div>
      <Header cartItemTotal={cartItemTotal} setCartItemTotal={setCartItemTotal} />
      <Products setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/>
      <User setCartItemTotal={setCartItemTotal} />
      <CartIndex setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal} />
      {productId && <Reviews productId={productId}/>}
      <Outlet />
    </div>
  );
}

export default Layout;
