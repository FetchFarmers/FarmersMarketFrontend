import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import AddToCart from '../cart_components/AddToCart';

export default function SearchResults({ setCartItemTotal, cartItemTotal }) {
  const location = useLocation();
  const searchResults = location.state ? location.state.searchResults : null;
  const searchQuery = location.state ? location.state.searchQuery : null;

  console.log(searchResults);
  console.log(location.state);

  return (
    <div className='products-page'>
      <h2>Search Results for "{searchQuery}"</h2>
      <div className="product-list">
        {searchResults.map((product) => (
          <div key={product.id} className="product">
            <Link to={`/products/${product.id}`}>
              <img className="product-image" src={product.imageURL} alt={product.name} />
              <div className="product-details">
                <h3 className='product-name'>{product.name}</h3>
                <p className='product-price'>${product.price}</p>
              </div>
            </Link>
            {product.id && <AddToCart setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal} productId={product.id} productInventory={product.inventory} className="add-to-cart" />}
          </div>
        ))}
      </div>
    </div>
  );
}