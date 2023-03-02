import React, { useState } from 'react';

const AddToCart = ({ productId, handleAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddToCartClick = () => {
    handleAddToCart(productId);
  }

  return (
    <div>
      <input
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        min={1}
        max={10}
      />
      <button onClick={handleAddToCartClick}>Add to Cart</button>
    </div>
  );
};

export default AddToCart;
