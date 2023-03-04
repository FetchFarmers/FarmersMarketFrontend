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
  
  return (
    <div className="mainBodyContainer">
      <h1 className='pageTitle' >cart</h1>
      {(!userOrderProducts[0]) && <h3 className='pageTitle' >Your cart is currently empty</h3>}
      {userOrderProducts && <ul>
        {userOrderProducts.map((item) => (
          <li key={item.id}>
            <p>{item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
          </li>
        ))}
      </ul>}
    </div>
  );
}

export default Cart;
