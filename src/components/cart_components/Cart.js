/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { 
  fetchRemoveOrderProduct,
  fetchUpdateOrderProductQuantity,
   fetchUserOpenOrders
} from '../../orders_api'; 


function Cart() {
  const [userOrderProducts, setUserOrderProducts] = useState([])
  const [quantity, setQuantity] = useState(0);

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

  async function handleRemoveItem(orderProductId){
    try{
      const results = await fetchRemoveOrderProduct (orderProductId)
      loadUserOpenOrders()

    } catch (error) {
      console.error(error);
    }

  }

  async function handleUpdateItem(orderProductId) {
    try{
      const results = await fetchUpdateOrderProductQuantity (orderProductId, quantity)
      loadUserOpenOrders()

    } catch (error) {
      console.error(error);
    }

  }

  let orderSum = 0

  if(userOrderProducts){
    userOrderProducts.map((item) => 
      orderSum += item.price*item.quantity
    )
  }

  return (
    <div className="cartContainer">
      <h1 className='pageTitle' >cart</h1>
      {(!userOrderProducts) && <h3 className='pageTitle' >Your cart is currently empty</h3>}
      {userOrderProducts && <ul>
        {userOrderProducts.map((item) =>
          (<div>
            <li key={item.id}>
              <h4>{item.name}</h4>
              <p>{item.quantity} x ${item.price}</p>
              <p>Total: ${(item.price*item.quantity).toFixed(2)}</p>
            </li>
            <div>
              <button className="userControlsLoginLink" onClick={() =>handleRemoveItem(item.orderProductId)} >Remove Item</button>
              <input className='quantityDropdown' type="number" defaultValue={item.quantity} onChange={(event) => setQuantity(event.target.value)} min={1} max={item.inventory || 10}/>
              <button className="userControlsLoginLink" onClick={() => handleUpdateItem(item.orderProductId)}>Update Item</button>
            </div>
          </div>
        ))}
        <h4>Order Total: ${orderSum.toFixed(2)}</h4>
      </ul>}
      
    </div>
  );
}

export default Cart;
