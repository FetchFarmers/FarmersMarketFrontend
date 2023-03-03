import { useState, useEffect } from "react";
import AddToCart from "../../../cart_components/AddToCart";
import handleAddToCart from '../../../cart_components/AddToCart';

const BeefProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchBeefProducts = async () => {
      try {
        const response = await fetch("https://farmers-market-1oeq.onrender.com/api/products/subcategory/Beef");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBeefProducts();
  }, []);

  return (
    <div>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Inventory: {product.inventory}</p>
            <p>Price: ${product.price}</p>
            <p>Subcategory: {product.subcategory}</p>
            <img src={product.imageURL} alt={product.name} />
            {product.id && <AddToCart productId={product.id} onClick={() => handleAddToCart(product.id)}/>}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default BeefProducts;