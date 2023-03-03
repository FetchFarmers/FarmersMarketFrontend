import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddToCart from '../../cart_components/AddToCart';
import handleAddToCart from '../../cart_components/AddToCart';

function Produce() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://farmers-market-1oeq.onrender.com/api/products/category/Fresh%20Fruits%20and%20Vegetables')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.log('There was a problem with the API request:', error);
      });
  }, []);

  return (
    <div className='products-page'>
      <h3 className='product-title'>Fruits & Vegetables</h3>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product">
            <Link to={`/products/${product.id}`}>
              <img src={product.imageURL} alt={product.name} />
              <h3 className='product-name'>{product.name}</h3>
            </Link>
            <p>${product.price}</p>
            {product.id && <AddToCart productId={product.id} onClick={() => handleAddToCart(product.id)}/>}
          </div>
        ))}
      </div>
    </div>
  );  
}

export default Produce;
