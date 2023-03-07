import React, { useState } from 'react';
import { createProduct } from '../../../products_api';
import { menuItems } from '../../../menuItems';

export default function CreateProduct({ onProductCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [inventory, setInventory] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
      setShowForm(false); // hide form after submitting
      setIsSuccess(true); // set success state to true
      onProductCreated(newProduct); // call parent component's onProductCreated function
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setShowSuccessMessage(false);
    setIsSuccess(false); // reset success state to false
  };

  const handleCreateProduct = () => {
    setIsSuccess(false); // reset success state to false
    setShowForm(true);
  };

  return (
    <div className="create-product-container">
      {!showForm ? (
        <button onClick={handleCreateProduct} className="create-product-button">
          Create Product
        </button>
      ) : (
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
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory("");
                setIsSuccess(false); // reset success state to false
              }}
              className="create-product-select"
            >
              <option value="">Select a category</option>
              {menuItems.map((item) => (
                <option key={item.url} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
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
          </div>
          <div>
            <label className="create-product-label">Image URL</label>
            <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} className="create-product-input" />
          </div>
          <div className='create-product-buttons'>
          <button type="submit" disabled={!name || !description || !inventory || !price || !category || !subcategory || !imageURL} className="create-product-submit-button">
            Submit
          </button>
          <button type="button" onClick={handleCancelForm} className="create-product-cancel-button">
            Cancel
          </button>
          </div>
        </form>
      )}
      {isSuccess && !showForm && (
        <div className="success-message">
          Product created successfully!
        </div>
      )}
    </div>
  );
}