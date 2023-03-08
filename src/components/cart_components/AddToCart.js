import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { fetchAddToOrder } from '../../orders_api';



const AddToCart = ({ productId, productInventory, setCartItemTotal, cartItemTotal}) => {
  const [quantity, setQuantity] = useState(1);
  const [userMessage, setUserMessage] = useState("")
  const token = window.localStorage.getItem("token")

  const handleAddToCartClick = (event) => {
    event.preventDefault()
    handleAddToCart(productId);
  }

  const randomString =  () => {
    return crypto.randomUUID()+"("+ new Date()+")"
  }

  async function handleAddToCart(productId) {
    try {  

      let sessionId = window.localStorage.getItem("fetchSessionId")

      if(!sessionId) {
        const newSessionId = randomString()
        window.localStorage.setItem("fetchSessionId", newSessionId )
      }

      sessionId = window.localStorage.getItem("fetchSessionId")
      const results = await fetchAddToOrder(sessionId, productId, quantity, token)
      console.log('fetchAddToOrderResults :>> ', results);

      if(results.id) {
        let newCartItemTotal = cartItemTotal*1+quantity*1
        console.log(newCartItemTotal)
        setCartItemTotal(newCartItemTotal);
        window.localStorage.setItem("cartTotal", newCartItemTotal)
        setUserMessage("Added to cart!!")
        setTimeout(() => setUserMessage(""), 1500);
      } else if (results.message === "duplicate key value violates unique constraint \"order_products_orderId_productId_key\"") {
        setUserMessage("Already in Cart. View cart to adjust quantity")
        setTimeout(() => setUserMessage(""), 1500);
      } else {
        setUserMessage("Error adding product please try again")
        setTimeout(() => setUserMessage(""), 1500);
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
    <h5 className='addToCartUserMessage'>{userMessage}</h5>
    <div className='addToCartContainer'>
      <input className='quantityDropdown'
        type="number"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
        min={1}
        max={productInventory}
      />
      <button className="addToCartButton" onClick={handleAddToCartClick}><FontAwesomeIcon  icon={faCartArrowDown}/></button>
    </div>
    </div>
  );
};

export default AddToCart;

