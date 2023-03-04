import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddToCart from "../../../cart_components/AddToCart";
import handleAddToCart from '../../../cart_components/AddToCart';

const SeafoodProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSeafoodProducts = async () => {
      try {
        const response = await fetch("https://farmers-market-1oeq.onrender.com/api/products/subcategory/Seafood");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSeafoodProducts();
  }, []);

  return (
    <div className='products-page'>
      <h3 className='product-title'>Meat & Seafood / Seafood</h3>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product">
            <Link to={`/products/${product.id}`}>
              <img className="product-image" src={product.imageURL} alt={product.name} />
              <div className="product-details">
                <h3 className='product-name'>{product.name}</h3>
                <p className='product-price'>${product.price}</p>
                {product.id && <AddToCart productId={product.id} onClick={() => handleAddToCart(product.id)} className="add-to-cart" />}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );  
}

export default SeafoodProducts;