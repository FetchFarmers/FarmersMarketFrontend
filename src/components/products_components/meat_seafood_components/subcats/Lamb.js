import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddToCart from "../../../cart_components/AddToCart";
import handleAddToCart from '../../../cart_components/AddToCart';

const LambProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchLambProducts = async () => {
      try {
        const response = await fetch("https://farmers-market-1oeq.onrender.com/api/products/subcategory/Lamb");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLambProducts();
  }, []);

  return (
    <div className='products-page'>
      <h3 className='product-title'>Meat & Seafood / Lamb</h3>
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
            {product.id && <AddToCart productId={product.id} productInventory={product.inventory} className="add-to-cart" />}
          </div>
        ))}
      </div>
    </div>
  );  
}

export default LambProducts;

