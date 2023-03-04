import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddToCart from '../cart_components/AddToCart';
import handleAddToCart from '../cart_components/AddToCart';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://farmers-market-1oeq.onrender.com/api/products/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
      })
      .catch(error => {
        console.log('There was a problem with the API request:', error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='products-page'>
      <h3 className='product-title'>{product.name}</h3>
      <div className='product'>
        <img src={product.imageURL} alt={product.name} />
        <div className='product-info'>
          <p>{product.description}</p>
          <p>Inventory: {product.inventory}</p>
          <p>Price: ${product.price}</p>
          <p>Subcategory: {product.subcategory}</p>
          {product.id && <AddToCart productId={product.id} onClick={() => handleAddToCart(product.id)}/>}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

