// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getAllReviewsByProductId, createReview } from '../../reviews_api/index.js';

// function Reviews() {
//   const { productId } = useParams();
//   const [reviews, setReviews] = useState([]);
//   const [title, setTitle] = useState('');
//   const [details, setDetails] = useState('');
//   const [starRating, setStarRating] = useState(0);

//   useEffect(() => {
//     async function fetchReviews() {
//       const reviews = await getAllReviewsByProductId(productId);
//       setReviews(reviews);
//     }
//     fetchReviews();
//   }, [productId]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const review = await createReview(productId, { title, details, starRating });
//       setReviews([...reviews, review]);
//       setTitle('');
//       setDetails('');
//       setStarRating(0);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Reviews for Product {productId}</h1>
//       <ul>
//         {reviews.map((review) => (
//           <li key={review.id}>
//             <h2>{review.title}</h2>
//             <p>{review.details}</p>
//             <p>{review.starRating} stars</p>
//           </li>
//         ))}
//       </ul>
//       <form onSubmit={handleSubmit}>
//         <label>Title:</label>
//         <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
//         <label>Details:</label>
//         <input type="text" value={details} onChange={(event) => setDetails(event.target.value)} />
//         <label>Star rating:</label>
//         <input type="number" value={starRating} onChange={(event) => setStarRating(parseInt(event.target.value))} />
//         <button type="submit">Submit Review</button>
//       </form>
//     </div>
//   );
// }

// export default Reviews;


// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllReviewsByProductId, createReview } from '../../reviews_api/index.js';
// import ReviewList from './ReviewList';
import ReviewsList from './ReviewsList';

function Reviews() {
  // Get productId from URL params and initialize state variables
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [starRating, setStarRating] = useState(0);

  // Fetch reviews for the current product on mount and when productId changes
  useEffect(() => {
    async function fetchReviews() {
      const reviews = await getAllReviewsByProductId(productId);
      setReviews(reviews);
    }
    fetchReviews();
  }, [productId]);

  // Submit a new review and update state variables accordingly
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const review = await createReview(productId, { title, details, starRating });
      setReviews([...reviews, review]);
      setTitle('');
      setDetails('');
      setStarRating(0);
    } catch (error) {
      console.error(error);
    }
  };

  // Render the component with necessary components and props
  return (
    <div>
      <h1>Reviews for Product {productId}</h1>
      <ReviewsList reviews={reviews} />
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        <label>Details:</label>
        <input type="text" value={details} onChange={(event) => setDetails(event.target.value)} />
        <label>Star rating:</label>
        <input type="number" value={starRating} onChange={(event) => setStarRating(parseInt(event.target.value))} />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default Reviews;


