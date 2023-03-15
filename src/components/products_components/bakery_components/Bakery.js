import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddToCart from '../../cart_components/AddToCart';
import Loading from '../../Loading';

function Bakery({setCartItemTotal, cartItemTotal}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://farmers-market-1oeq.onrender.com/api/products/category/Bakery')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.log('There was a problem with the API request:', error);
      });
  }, []);

  return (
    <div>
      {loading && <Loading/>}
      {!loading &&<div className='products-page'>
        <h3 className='product-title'>Bakery</h3>
        <div className="product-list">
          {products.map(product => (
          <div key={product.id} className="product">
            <Link to={`/products/${product.id}`}>
              <img className="product-image" src={product.imageURL} alt={product.name} />
              <div className="product-details">
                <h3 className='product-name'>{product.name}</h3>
                <p className='product-price'>${product.price}</p>
              </div>
            </Link>
            <div className='addToCartMultiProdCtr'>
              {product.id && <AddToCart setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal} productId={product.id} productInventory={product.inventory} className="add-to-cart" />}
            </div>          
          </div>
          ))}
        </div>
      </div>}
    </div>
  );  
}

export default Bakery;




