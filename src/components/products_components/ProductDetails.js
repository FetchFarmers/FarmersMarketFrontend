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
    <div className='product-details-page'>
      <h3 className='product-title'>{product.name}</h3>
      <div className='product-container'>
        <div className='product-image-container'>
          <img className='product-image' src={product.imageURL} alt={product.name} />
        </div>
        <div className='product-info-container'>
          <p className='product-description'>{product.description}</p>
          <p className='product-inventory'>Inventory: {product.inventory}</p>
          <p className='product-subcategory'>Subcategory: {product.subcategory}</p>
          <p className='product-price'>${product.price}</p>
          {product.id && <AddToCart productId={product.id} onClick={() => handleAddToCart(product.id)} className='add-to-cart' />}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
