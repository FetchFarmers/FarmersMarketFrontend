import React, { useState } from 'react';
import { createProduct } from '../../../products_api';
import { menuItems } from '../../../menuItems';

export default function CreateProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [inventory, setInventory] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const productData = {
        name,
        description,
        inventory,
        price,
        category,
        subcategory,
        imageURL,
      };
      const newProduct = await createProduct(productData);
      console.log('New product:', newProduct);
      setName('');
      setDescription('');
      setInventory('');
      setPrice('');
      setCategory('');
      setSubcategory('');
      setImageURL('');
    } catch (error) {
      console.error(error);
    }
  };

return (
<div className="create-product-container">
  <h2 className="create-product-title">Create Product</h2>
  <form onSubmit={handleSubmit} className="create-product-form">
    <div>
      <label className="create-product-label">Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="create-product-input" />
    </div>
    <div>
      <label className="create-product-label">Description</label>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="create-product-input" />
    </div>
    <div>
      <label className="create-product-label">Inventory</label>
      <input type="number" value={inventory} onChange={(e) => setInventory(e.target.value)} className="create-product-input" />
    </div>
    <div>
      <label className="create-product-label">Price</label>
      <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="create-product-input" />
    </div>
    <div>
      <label className="create-product-label">Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="create-product-select">
        <option value="">Select a category</option>
        {menuItems.map((item) => (
          <option key={item.url} value={item.title}>
            {item.title}
          </option>
        ))}
      </select>
    </div>
    {category && (
      <div>
        <label className="create-product-label">Subcategory</label>
        <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="create-product-select">
          <option value="">Select a subcategory</option>
          {menuItems
            .find((item) => item.title === category)
            ?.submenu.map((item) => (
              <option key={item.url} value={item.title}>
                {item.title}
              </option>
            ))}
        </select>
      </div>
    )}
    <div>
      <label className="create-product-label">Image URL</label>
      <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} className="create-product-input" />
    </div>
    <button type="submit" disabled={!name || !description || !inventory || !price || !category || !subcategory || !imageURL} className="create-product-submit-button">
      Create Product
    </button>
  </form>
</div>

);
              }
