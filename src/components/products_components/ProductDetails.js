import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddToCart from '../cart_components/AddToCart';
import { updateProduct } from '../../products_api';
import { fetchUserData } from '../../user_api';
import { menuItems } from '../../menuItems';
import Reviews from '../reviews_components/Reviews.js';
import PageNotFound from '../../PageNotFound';
import Loading from '../Loading';

export default function ProductDetails({setCartItemTotal, cartItemTotal}) {
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true); // Add state variable for read-only/edit mode
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetch(`https://farmers-market-1oeq.onrender.com/api/products/${id}`)
      .then(response => {
        if (!response.ok) {
          setIsLoading(false);
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
        setUpdatedProduct(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('There was a problem with the API request:', error);
        setIsLoading(false);
        setProduct(null);
      });


    // check if user is admin
    
    if (token) {
      fetchUserData(token)
        .then(userData => {
          setIsAdmin(userData.isAdmin);
        })
        .catch(error => {
          console.log('There was a problem fetching user data:', error);
        });
    }
  }, [id, token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isAdmin) {
      return;
    }
    try {
      await updateProduct(id, updatedProduct);
      setProduct(updatedProduct);
      setIsReadOnly(true); // Set form back to read-only mode after submitting changes
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!product || Object.keys(product).length === 0) {
    return <PageNotFound />;
  }  

  let productName = product.name;

  if (productName === 'error') {
    return <PageNotFound />;
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
            {!isReadOnly && (
              <div className="edit-field">
                <label>Name:</label>
                <input type="text" name="name" value={updatedProduct.name} onChange={handleInputChange} />
              </div>
            )}
            <div className="edit-field">
              {isReadOnly ? (
                <p>{product.description}</p>
              ) : (
                <div>
                  <label>Description:</label>
                  <textarea name="description" value={updatedProduct.description} onChange={handleInputChange}></textarea>
                </div>
              )}
            </div>
            {!isReadOnly && (
              <div className="edit-field">
                <label>Inventory:</label>
                <input type="number" step="1" name="inventory" value={updatedProduct.inventory} onChange={handleInputChange} />
              </div>
            )}
            {!isReadOnly && (
              <div className="edit-field">
                <label>Category:</label>
                <select name="category" value={updatedProduct.category} onChange={handleInputChange}>
                  <option value="">Select a category</option>
                  {menuItems.map((item) => (
                    <option key={item.url} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="edit-field">
              {isReadOnly ? (
                <p>{product.subcategory}</p>
              ) : (
                <div>
                  <label>Subcategory:</label>
                  <select name="subcategory" value={updatedProduct.subcategory} onChange={handleInputChange}>
                    <option value="">Select a subcategory</option>
                    {menuItems
                      .find((item) => item.title === updatedProduct.category)
                      ?.submenu.map((item) => (
                        <option key={item.url} value={item.title}>
                          {item.title}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>
            <div className="edit-field">
              {isReadOnly ? (
                <p>${product.price}</p>
              ) : (
                <div>
                  <label>Price:</label>
                  <input type="number" step="0.01" name="price" value={updatedProduct.price} onChange={handleInputChange} />
                </div>
              )}
            </div>
            {!isReadOnly && (
              <div className="edit-field">
                <label>Image URL:</label>
                <input type="text" name="imageURL" value={updatedProduct.imageURL} onChange={handleInputChange} />
              </div>
            )}
            {isAdmin && (
              <div className="edit-buttons">
                {isReadOnly ? (
                  <button type="button" className="btn-edit" onClick={() => setIsReadOnly(false)}>Edit</button>
                ) : (
                  <div className="edit-actions">
                    <button type="submit" className="btn-save">Save</button>
                    <button type="button" className="btn-cancel" onClick={() => {
                      setIsReadOnly(true);
                      setUpdatedProduct(product);
                    }}>Cancel</button>
                  </div>
                )}
              </div>
            )}
          </form>
          {isReadOnly && product.id && (
            <AddToCart setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal} productId={product.id} productInventory={product.inventory} className="add-to-cart-detail-page" />
          )}
        </div>
      </div>
      {/* <Reviews productId={id} /> */}
      {token && <Reviews productName={productName} productId={product.id}/>}
    </div>
  );
}


// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import AddToCart from '../cart_components/AddToCart';
// import { updateProduct } from '../../products_api';
// import { fetchUserData } from '../../user_api';
// import { menuItems } from '../../menuItems';
// import Reviews from '../reviews_components/Reviews.js';

// export default function ProductDetails({setCartItemTotal, cartItemTotal}) {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [updatedProduct, setUpdatedProduct] = useState({
//     name: '',
//     description: '',
//     inventory: '',
//     price: '',
//     category: '',
//     subcategory: '',
//     imageURL: '',
//   });
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isReadOnly, setIsReadOnly] = useState(true); // Add state variable for read-only/edit mode

//   useEffect(() => {
//     fetch(`https://farmers-market-1oeq.onrender.com/api/products/${id}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setProduct(data);
//         setUpdatedProduct(data);
//       })
//       .catch(error => {
//         console.log('There was a problem with the API request:', error);
//       });

//     // check if user is admin
//     const token = localStorage.getItem('token');
//     if (token) {
//       fetchUserData(token)
//         .then(userData => {
//           setIsAdmin(userData.isAdmin);
//         })
//         .catch(error => {
//           console.log('There was a problem fetching user data:', error);
//         });
//     }
//   }, [id]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUpdatedProduct({ ...updatedProduct, [name]: value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!isAdmin) {
//       return;
//     }
//     try {
//       await updateProduct(id, updatedProduct);
//       setProduct(updatedProduct);
//       setIsReadOnly(true); // Set form back to read-only mode after submitting changes
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   const productName = product ? product.name : '';
  
//   return (
//     <div className='product-details-page'>
//       <h3 className='product-title'>{product.name}</h3>
//       <div className='product-container'>
//         <div className='product-image-container'>
//           <img className='product-image' src={product.imageURL} alt={product.name} />
//         </div>
//         <div className='product-info-container'>
//           <form onSubmit={handleSubmit}>
//             {!isReadOnly && (
//               <div className="edit-field">
//                 <label>Name:</label>
//                 <input type="text" name="name" value={updatedProduct.name} onChange={handleInputChange} />
//               </div>
//             )}
//             <div className="edit-field">
//               {isReadOnly ? (
//                 <p>{product.description}</p>
//               ) : (
//                 <div>
//                   <label>Description:</label>
//                   <textarea name="description" value={updatedProduct.description} onChange={handleInputChange}></textarea>
//                 </div>
//               )}
//             </div>
//             {!isReadOnly && (
//               <div className="edit-field">
//                 <label>Inventory:</label>
//                 <input type="number" step="1" name="inventory" value={updatedProduct.inventory} onChange={handleInputChange} />
//               </div>
//             )}
//             {!isReadOnly && (
//               <div className="edit-field">
//                 <label>Category:</label>
//                 <select name="category" value={updatedProduct.category} onChange={handleInputChange}>
//                   <option value="">Select a category</option>
//                   {menuItems.map((item) => (
//                     <option key={item.url} value={item.title}>
//                       {item.title}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}
//             <div className="edit-field">
//               {isReadOnly ? (
//                 <p>{product.subcategory}</p>
//               ) : (
//                 <div>
//                   <label>Subcategory:</label>
//                   <select name="subcategory" value={updatedProduct.subcategory} onChange={handleInputChange}>
//                     <option value="">Select a subcategory</option>
//                     {menuItems
//                       .find((item) => item.title === updatedProduct.category)
//                       ?.submenu.map((item) => (
//                         <option key={item.url} value={item.title}>
//                           {item.title}
//                         </option>
//                       ))}
//                   </select>
//                 </div>
//               )}
//             </div>
//             <div className="edit-field">
//               {isReadOnly ? (
//                 <p>${product.price}</p>
//               ) : (
//                 <div>
//                   <label>Price:</label>
//                   <input type="number" step="0.01" name="price" value={updatedProduct.price} onChange={handleInputChange} />
//                 </div>
//               )}
//             </div>
//             {!isReadOnly && (
//               <div className="edit-field">
//                 <label>Image URL:</label>
//                 <input type="text" name="imageURL" value={updatedProduct.imageURL} onChange={handleInputChange} />
//               </div>
//             )}
//             {isAdmin && (
//               <div className="edit-buttons">
//                 {isReadOnly ? (
//                   <button type="button" className="btn-edit" onClick={() => setIsReadOnly(false)}>Edit</button>
//                 ) : (
//                   <div className="edit-actions">
//                     <button type="submit" className="btn-save">Save</button>
//                     <button type="button" className="btn-cancel" onClick={() => {
//                       setIsReadOnly(true);
//                       setUpdatedProduct(product);
//                     }}>Cancel</button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </form>
//           {isReadOnly && product.id && (
//             <AddToCart setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal} productId={product.id} productInventory={product.inventory} className="add-to-cart-detail-page" />
//           )}
//         </div>
//       </div>
//       {/* <Reviews productId={id} /> */}
//       <Reviews productName={productName} productId={id} />
//     </div>
//   );
// }





 