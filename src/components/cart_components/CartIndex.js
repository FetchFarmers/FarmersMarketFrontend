import React, {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import Cart from './Cart';
import Completion from './Completion';
import Payments from './Payments';

const CartIndex = ({setCartItemTotal, cartItemTotal}) => {
  const [orderId, setOrderId] = useState(0)
  const [userOrderProducts, setUserOrderProducts] = useState([])
  const [cartTotal, setCartTotal] = useState(0)


  return (
    <div className="App">
      <Routes>
        <Route path="/my_cart" element={<Cart 
          setCartItemTotal={setCartItemTotal} 
          cartItemTotal={cartItemTotal}
          orderId={orderId} 
          setOrderId={setOrderId}
          userOrderProducts={userOrderProducts}
          setUserOrderProducts={setUserOrderProducts}
          setCartTotal={setCartTotal}
        />} />
        <Route path="/order/payment" element={ <Payments 
          setCartItemTotal={setCartItemTotal} 
          cartItemTotal={cartItemTotal}
          orderId={orderId} 
          setOrderId={setOrderId}
          userOrderProducts={userOrderProducts}
          setUserOrderProducts={setUserOrderProducts}
          cartTotal={cartTotal} 
          setCartTotal={setCartTotal}
        /> } />
        <Route path="/payment_completion" element={<Completion/>}/>
      </Routes>
    </div>
  );

}

export default CartIndex;