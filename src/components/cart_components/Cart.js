/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { 
   fetchUserOpenOrders
} from '../../orders_api'; 


function Cart() {
  const [userOrderProducts, setUserOrderProducts] = useState([])

  const randomString =  () => {
    return crypto.randomUUID()+"(TS-"+Date.now()+")"
  }
  
  async function loadUserOpenOrders() {
    try {  
      const sessionId = window.localStorage.getItem("fetchSessionId")

      if (sessionId) {
        const results = await fetchUserOpenOrders(sessionId);
        setUserOrderProducts(() => results.products);

      } else {
        const newSessionId = randomString();
        window.localStorage.setItem("fetchSessionId", newSessionId )
        const results = await fetchUserOpenOrders(newSessionId);
        setUserOrderProducts(() => results.products);

      }
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadUserOpenOrders()
  }, [])

  let orderSum = 0
  userOrderProducts.map((item) => 
    orderSum += item.price*item.quantity
  )
  
  return (
    <div className="mainBodyContainer">
      <h1 className='pageTitle' >cart</h1>
      {(!userOrderProducts[0]) && <h3 className='pageTitle' >Your cart is currently empty</h3>}
      {userOrderProducts && <ul>
        {userOrderProducts.map((item) => (
          <li key={item.id}>
            <h4>{item.name}</h4>
            <p>{item.quantity} x ${item.price}</p>
            <p>Total: ${(item.price*item.quantity).toFixed(2)}</p>
          </li>
        ))}
        <h4>Order Total: $ {orderSum.toFixed(2)}</h4>
      </ul>}
    </div>
  );
}

export default Cart;
