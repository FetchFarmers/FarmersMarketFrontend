import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { fetchAddToOrder } from '../../orders_api';



const AddToCart = ({ productId, productInventory}) => {
  const [quantity, setQuantity] = useState(1);
  const token = window.localStorage.getItem("token")

  const handleAddToCartClick = (event) => {
    event.preventDefault()
    handleAddToCart(productId);
  }

  const randomString =  () => {
    return crypto.randomUUID()+"(TS-"+Date.now()+")"
  }

  async function handleAddToCart(productId) {
    try {  

      const sessionId = window.localStorage.getItem("fetchSessionId")

      if (sessionId) {
        const results = await fetchAddToOrder(sessionId, productId, quantity, token)
        console.log('fetchAddToOrderResults :>> ', results);

      } else {
        const newSessionId = randomString()
        window.localStorage.setItem("fetchSessionId", newSessionId )
        const results = await fetchAddToOrder(sessionId, productId, quantity, token)
        console.log('fetchAddToOrderResults :>> ', results);
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
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

