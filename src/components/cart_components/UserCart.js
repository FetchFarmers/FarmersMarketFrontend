/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

import { 
   fetchUserOpenOrders
} from '../../orders_api'; 


function Cart() {
  const [userOrderProducts, setUserOrderProducts] = useState([])
  const [sessionId, setSessionId] = useState("")
  const [token, setToken] = useState()
  
 
  //! you hard coded in the sessionID to test make sure to remove that 
  const randomString =  () => {
    setSessionId("6489igj")
    return "6489igj"
  }

  async function loadUserOpenOrders() {
    try {  
      const newSessionId = randomString()
      setSessionId(newSessionId);
      const results = await fetchUserOpenOrders(token, newSessionId)
      setUserOrderProducts(() => results.products)
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    loadUserOpenOrders()
  }, [])
  console.log('userOrderProducts :>> ', userOrderProducts);

  return (
    <div className="mainBodyContainer">
      <h1 className='pageTitle' >cart</h1>
      <ul>
        {userOrderProducts.map((item) => (
          <li key={item.id}>
            <p>{item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
