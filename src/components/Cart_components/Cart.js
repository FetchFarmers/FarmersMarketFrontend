/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

import { 
   fetchUserOpenOrders
} from '../../orders_api'; 

const Cart = () => {
  const [userOpenOrders, setUserOpenOrders] = useState({})
  console.log("🚀 ~ file: Cart.js:11 ~ Cart ~ userOpenOrders:", userOpenOrders)
  const [sessionId, setSessionId] = useState("")
  console.log("🚀 ~ file: Cart.js:13 ~ Cart ~ sessionId:", sessionId)
  const [token, setToken] = useState()
  
 
  //! you hard coded in the sessionID to test make sure to remove that 
  const randomString =  () => {
    setSessionId()
    return "6489igj"
  }

  async function loadUserOpenOrders() {
    try {  
      const newSessionId = randomString()
      setSessionId(newSessionId);
      const results = await fetchUserOpenOrders(token, newSessionId)
      setUserOpenOrders(() => results)
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    loadUserOpenOrders()
  }, [])
  console.log('userOpenOrders :>> ', userOpenOrders);

    return(
        <div className="mainBodyContainer">
        <h1 className='pageTitle' >cart</h1>
        <p1 >{sessionId}</p1>
        </div>
    );
}
export default Cart;








