import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddToCart from '../cart_components/AddToCart';
import { updateProduct } from '../../products_api';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: '',
    description: '',
    inventory: '',
    price: '',
    category: '',
    subcategory: '',
    imageURL: '',
  });

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
        setUpdatedProduct(data);
      })
      .catch(error => {
        console.log('There was a problem with the API request:', error);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProduct({...updatedProduct, [name]: value});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateProduct(id, updatedProduct);
      setProduct(updatedProduct);
    } catch (error) {
      console.log(error);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" name="name" value={updatedProduct.name} onChange={handleInputChange} />
            <label>Description:</label>
            <textarea name="description" value={updatedProduct.description} onChange={handleInputChange}></textarea>
            <label>Inventory:</label>
            <input type="number" name="inventory" value={updatedProduct.inventory} onChange={handleInputChange} />
            <label>Price:</label>
            <input type="number" step="0.01" name="price" value={updatedProduct.price} onChange={handleInputChange} />
            <label>Category:</label>
            <input type="text" name="category" value={updatedProduct.category} onChange={handleInputChange} />
            <label>Subcategory:</label>
            <input type="text" name="subcategory" value={updatedProduct.subcategory} onChange={handleInputChange} />
            <label>Image URL:</label>
            <input type="text" name="imageURL" value={updatedProduct.imageURL} onChange={handleInputChange} />
            <button type="submit">Update Product</button>
          </form>
          <p className='product-inventory'>Inventory: {product.inventory}</p>
          <p className='product-subcategory'>Subcategory: {product.subcategory}</p>
          <p className='product-price'>${product.price}</p>
          {product.id && <AddToCart productId={product.id} productInventory={product.inventory} className="add-to-cart" />}
        </div>
      </div>
    </div>
  );
}
