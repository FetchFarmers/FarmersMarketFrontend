import React, { useState } from 'react';
import { createReview } from '../../reviews_api';

function ReviewForm({ productId }) {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [starRating, setStarRating] = useState('');
  const [product, setProduct] = useState(productId);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const review = await createReview(product, { title, details, starRating });
      console.log('Review created:', review);
      setTitle('');
      setDetails('');
      setStarRating('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="product">Product Id:</label>
      <input type="text" id="product" value={product} onChange={(event) => setProduct(event.target.value)} required />

      <label htmlFor="title">Title:</label>
      <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} required />

      <label htmlFor="details">Details:</label>
      <textarea id="details" value={details} onChange={(event) => setDetails(event.target.value)} required />

      <label htmlFor="starRating">Star Rating:</label>
      <input type="number" id="starRating" min="1" max="5" value={starRating} onChange={(event) => setStarRating(event.target.value)} required />

      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;




// // Import React and useState hook from react library
// import React, { useState } from 'react';
// // Import createReview function from api file
// import { createReview } from '../../reviews_api';


// // Define ReviewForm component that accepts productId as a prop
// function ReviewForm({ productId }) {
//   // Define state variables for title, details and starRating
//   const [title, setTitle] = useState('');
//   const [details, setDetails] = useState('');
//   const [starRating, setStarRating] = useState('');

//   // Define submit handler function that will be called when the form is submitted
//   const handleSubmit = async (event) => {
//     event.preventDefault(); // Prevent the default form submission behavior
//     try {
//       // Call the createReview function with the productId, title, details and starRating
//       const review = await createReview(productId, { title, details, starRating });
//       console.log('Review created:', review); // Log the created review to the console
//       setTitle(''); // Reset title state
//       setDetails(''); // Reset details state
//       setStarRating(''); // Reset starRating state
//     } catch (error) {
//       console.error(error); // Log any errors to the console
//     }
//   };

//   // Return a form with inputs for title, details and starRating and a submit button
//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="title">Title:</label>
//       <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} required />

//       <label htmlFor="details">Details:</label>
//       <textarea id="details" value={details} onChange={(event) => setDetails(event.target.value)} required />

//       <label htmlFor="starRating">Star Rating:</label>
//       <input type="number" id="starRating" min="1" max="5" value={starRating} onChange={(event) => setStarRating(event.target.value)} required />

//       <button type="submit">Submit Review</button>
//     </form>
//   );
// }

// // Export the ReviewForm component as the default export
// export default ReviewForm;
