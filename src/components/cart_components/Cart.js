/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';

import { 
  fetchRemoveOrderProduct,
  fetchUpdateOrderProductQuantity,
  fetchUserOpenOrders,
  fetchCancelOrder,
} from '../../orders_api'; 




const Cart = ({setCartItemTotal, cartItemTotal, orderId, setOrderId, userOrderProducts, setUserOrderProducts, setCartTotal}) => {
  const [quantity, setQuantity] = useState(0);
  const [userMessage, setUserMessage] = useState("")
  const [checkoutError, setCheckoutError] = useState(false)
  const [loading, setLoading] = useState(false)


  const randomString =  () => {
    return crypto.randomUUID()
  }
  
  async function loadUserOpenOrders() {
    try {  
      setCheckoutError(false)
      setLoading(true)
      const sessionId = window.localStorage.getItem("fetchSessionId")
      if (!sessionId) {
        const newSessionId = randomString();
        window.localStorage.setItem("fetchSessionId", newSessionId )
      }
      const results = await fetchUserOpenOrders(sessionId);
      const resultProducts = results.products
      if (results.products) {
        const sortedProducts = resultProducts.sort((a, b) => (a.name > b.name) ? 1: -1);
        console.log('sortedProducts :>> ', sortedProducts);
        setUserOrderProducts(() => sortedProducts);
        setOrderId(() => results.id)
        console.log('loadOrderResults :>> ', results);
        for (let i = 0; i < sortedProducts.length; i++) {
          if (sortedProducts[i].inventory < sortedProducts[i].quantity) {
            setCheckoutError(true)
          }
        }
        let numOfItems = 0
        if (results.products) {
          results.products.map((product) => numOfItems += product.quantity)
          setCartItemTotal(numOfItems)
          window.localStorage.setItem("cartTotal", numOfItems)
        }
      }
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  }

  async function reloadUserOpenOrders() {
    try {  
      setCheckoutError(false)
      const sessionId = window.localStorage.getItem("fetchSessionId")
      if (!sessionId) {
        const newSessionId = randomString();
        window.localStorage.setItem("fetchSessionId", newSessionId )
      }
      const results = await fetchUserOpenOrders(sessionId);
      const resultProducts = results.products
      if (results.products) {
        const sortedProducts = resultProducts.sort((a, b) => (a.name > b.name) ? 1: -1);
        console.log('sortedProducts :>> ', sortedProducts);
        setUserOrderProducts(() => sortedProducts);
        setOrderId(() => results.id)
        console.log('loadOrderResults :>> ', results);
        for (let i = 0; i < sortedProducts.length; i++) {
          if (sortedProducts[i].inventory < sortedProducts[i].quantity) {
            setCheckoutError(true)
          }
        }
        let numOfItems = 0
        if (results.products) {
          results.products.map((product) => numOfItems += product.quantity)
          setCartItemTotal(numOfItems)
          window.localStorage.setItem("cartTotal", numOfItems)
        }
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
      console.log('RemoveItemResults :>> ', results);
      if (results.id === orderProductId ){
        reloadUserOpenOrders()
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
      console.log('UpdateItemResults :>> ', results);
      if (results.quantity === quantity){
        setUserMessage("Sorry there was an error updating your item please try again")
        console.log(userMessage)
      } else {  
        reloadUserOpenOrders()
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  async function handleCancelOrder() {
    try{
      const results = await fetchCancelOrder(orderId)
      console.log('cancelOrderResults :>> ', results);
      setUserOrderProducts([])
      setCartItemTotal(0)
      window.localStorage.removeItem("cartTotal")
      
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
  let taxes = orderSum*.05
      

  return (
    <div>
    {loading && <Loading/>}
    {!loading &&<div className='mainCartPage'>
      <h3 className='cartPageTitle' >Shopping Cart</h3>
      <div className='cartDetailsCtr'>
        <div className='cartProductsOutsideCtr'>
        <h3 className="cartProductsCtrTitle">Products {cartItemTotal !== 0 && <>({cartItemTotal} {cartItemTotal > 1 ? <>items</> : <>item</>})</>}</h3>
          <div className="cartProductsCtr">
            {cartItemTotal === 0 && <h4 className='cartEmptyMessage' >Your cart is currently empty</h4>}
            {userOrderProducts && <div>
              {userOrderProducts.map((item) =>
                  (<div className='cartProductCtr'>
                    <div key={item.id}>
                      <div className='cartProductCtrTop'>
                      <Link to={`/products/${item.id}`}><p className='cartProdTitle'>{item.name}<span className ='itemPrice'> - ${item.price} each</span></p></Link>
                        <button className="xFromCartBtn" onClick={() =>handleRemoveItem(item.orderProductId)} >X</button>
                      </div>  
                      <div className='cartQtyTotalCtr'>
                        <div className='cartQtyCtr'>
                          <h4 className='cartQtyTitle'>Quantity</h4>
                          <form onClick={()=>handleUpdateItem(item.orderProductId)}>
                          <input className='cartQtyDropdown' type='number' defaultValue={item.quantity} onChange={(event) => setQuantity(event.target.value)} min={1} max={item.inventory || 10}/>
                          </form>
                        </div>
                        <h4 className='cartProdTotal'>${(item.price*item.quantity).toFixed(2)}</h4>
                      </div>
                      {(item.inventory !== 0) && (item.inventory < item.quantity) &&<p className='inventoryMsg'>Only {item.inventory} of this item are still available please adjust your quantity</p>}
                      {(item.inventory === 0) && <p className='inventoryMsg'>This item is no longer available. Please remove.</p>}
                    </div>
                  </div>
            ))}</div>}
          </div>        
        </div>
        <div>  
          {cartItemTotal !== 0 && <div className="checkoutDetailsCtr">
            <h3 className="cartCheckoutDetailsCtrTitle">Order Details</h3>
            <h3 className='sumTotal'>Products Total: ${orderSum.toFixed(2)}</h3>
            <h3 className='shippingCharge'>Delivery Fee: $5.99</h3>
            <h3 className='taxes'>Taxes: ${taxes.toFixed(2)}</h3>
            <h3 className='orderTotal'>Order Total: ${(orderSum+taxes+5.99).toFixed(2)}</h3>
            <div className='manageCartBtnCtr'>
              {!checkoutError && <Link onClick={() => setCartTotal((orderSum+taxes+5.99).toFixed(2))} to='/order/payment'><button className="checkoutCartBtn" >Checkout</button></Link>}
              <button className="cancelOrderBtn" onClick={() => handleCancelOrder()} >Cancel Order</button>  
            </div>
            {checkoutError && <p className='inventoryMsg'>There is an issue with your selected products. Please review to proceed</p>}
          </div>}
        </div>
      </div>
    </div>}
    </div>
  );
}

export default Cart;

