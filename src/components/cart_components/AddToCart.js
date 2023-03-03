import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'

const AddToCart = ({ productId }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCartClick = () => {
    handleAddToCart(productId);
  }

  const handleAddToCart = (productId) => {

    console.log(quantity)
    console.log(`Product ${productId} added to cart!`);
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