import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { fetchAddToOrder } from '../../orders_api';



const AddToCart = ({ productId }) => {
  const [quantity, setQuantity] = useState(1);
  const [userOrderProducts, setUserOrderProducts] = useState([])
  const [sessionId, setSessionId] = useState("");
  // const [token, setToken] = useState("")
  const token = window.localStorage.getItem("token")

  const handleAddToCartClick = (event) => {
    event.preventDefault()
    handleAddToCart(productId);
  }

  const randomString =  () => {
    setSessionId("6489igj")
    return "6489igj"
  }

  async function handleAddToCart(productId) {
    try {  
      const newSessionId = randomString()
      setSessionId(newSessionId);
      const results = await fetchAddToOrder(token, newSessionId, productId, quantity)
      console.log('fetchAddToOrderResults :>> ', results);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='addToCartContainer'>
      <input className='quantityDropdown'
        type="number"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
        min={1}
        max={10}
      />
      <button className="addToCartButton" onClick={handleAddToCartClick}><FontAwesomeIcon  icon={faCartArrowDown}/></button>
      
    </div>
  );
};

export default AddToCart;
