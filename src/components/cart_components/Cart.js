/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

import { 
  fetchRemoveOrderProduct,
  fetchUpdateOrderProductQuantity,
  fetchUserOpenOrders,
  fetchCheckout,
  fetchCancelOrder,
} from '../../orders_api'; 


function Cart({setCartItemTotal, cartItemTotal}) {
  const [userOrderProducts, setUserOrderProducts] = useState([])
  const [quantity, setQuantity] = useState(0);
  const [userMessage, setUserMessage] = useState("")
  const [orderId, setOrderId] = useState(0)

  const randomString =  () => {
    return crypto.randomUUID()+"("+ new Date()+")"
  }
  
  async function loadUserOpenOrders() {
    try {  
      const sessionId = window.localStorage.getItem("fetchSessionId")

      if (sessionId) {
        const results = await fetchUserOpenOrders(sessionId);
        setUserOrderProducts(() => results.products);
        setOrderId(() => results.id)
        console.log('results :>> ', results);
        let numOfItems = 0
        results.products.map((product) => numOfItems += product.quantity)
        window.localStorage.setItem("CartTotal", numOfItems)
        setCartItemTotal(numOfItems)

      } else {
        const newSessionId = randomString();
        window.localStorage.setItem("fetchSessionId", newSessionId )
        const results = await fetchUserOpenOrders(newSessionId);
        setUserOrderProducts(() => results.products);
        setOrderId(() => results.id)
        let numOfItems = 0
        results.products.map((product) => numOfItems += product.quantity)
        window.localStorage.setItem("CartTotal", numOfItems)
        setCartItemTotal(numOfItems)

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
      console.log('results :>> ', results);
      if (results.id === orderProductId ){
        loadUserOpenOrders()
      } else {  
        setUserMessage("Sorry there was an error removing your item please try again")
        console.log(userMessage)
      }

    } catch (error) {
      console.error(error);
    }

  }

  async function handleUpdateItem(orderProductId) {
    try{
      const results = await fetchUpdateOrderProductQuantity (orderProductId, quantity)
      if (results.quantity === quantity){
        setUserMessage("Sorry there was an error updating your item please try again")
        console.log(userMessage)
      } else {  
        loadUserOpenOrders()
      }
    } catch (error) {
      console.error(error);
    }

  }

  async function handleCheckout() {
    try{

      const orderDate = new Date()
      console.log('orderDate :>> ', orderDate);

      const results = await fetchCheckout (orderId, orderSum, orderDate)
      if (!results.isCheckedOut){
        setUserMessage("Sorry there was an error updating your item please try again")
        console.log(userMessage)
      } else {  
        loadUserOpenOrders()
        setCartItemTotal(0)

      }
    } catch (error) {
      console.error(error);
    }

  }

  async function handleCancelOrder() {
    try{

      const results = await fetchCancelOrder(orderId)
      console.log(results)
      loadUserOpenOrders()
      setCartItemTotal(0)
      cartItemTotal()
      
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
      <h1 className='pageTitle' >My Cart {cartItemTotal !== 0 && <>({cartItemTotal} items)</>}</h1>
      {(!userOrderProducts) && <h3 className='pageTitle' >Your cart is currently empty</h3>}
      {userOrderProducts && <ul>
        {userOrderProducts.map((item) =>
          (<div>
            <div key={item.id}>
              <h4>{item.name} ({item.quantity} x ${item.price})</h4>
              <h4>Total: ${(item.price*item.quantity).toFixed(2)}</h4>
              <div className='editCartControlsContainer'>
                <input className='quantityDropdown' type="number" defaultValue={item.quantity} onChange={(event) => setQuantity(event.target.value)} min={1} max={item.inventory || 10}/>
                <button className="editCartButtons" onClick={() => handleUpdateItem(item.orderProductId)}>Update&nbsp;<FontAwesomeIcon  icon={faCartShopping}/></button>
                <button className="editCartButtons" onClick={() =>handleRemoveItem(item.orderProductId)} >Remove All</button>
              </div>
            </div>
          </div>
        ))}
        <h3>Order Total: ${orderSum.toFixed(2)}</h3>
        <div className='editCartControlsContainer'>
        {cartItemTotal !== 0 &&<button className="editCartButtons" onClick={() =>handleCheckout()} >Checkout</button>}
        {cartItemTotal !== 0 &&<button className="editCartButtons" onClick={() =>handleCancelOrder()} >Cancel Order</button>}
        </div>
      </ul>}
    </div>
  );
}

export default Cart;

