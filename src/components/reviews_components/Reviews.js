// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllReviewsByProductId, createReview } from '../../reviews_api/index.js';
// import ReviewList from './ReviewList';
import ReviewsList from './ReviewsList';
import './review.css'; // import the CSS file here

function Reviews(props) {
  // Get productId from URL params and initialize state variables
  // const { productId } = useParams();
  const { productId } = props;
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
      const review = await createReview(productId,{title, details, starRating });
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
    <div className="reviews-container">
      {/* <h1 className="reviews-heading">Reviews for Product {productId}</h1> */}
      <h1 className="reviews-heading">Reviews for {props.productName} ({props.productId})</h1>
      <ReviewsList reviews={reviews} />
      <form className="reviews-form" onSubmit={handleSubmit}>
        <label className="reviews-form-label">Title:</label>
        <input className="reviews-form-input" type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        <label className="reviews-form-label">Details:</label>
        <input className="reviews-form-input" type="text" value={details} onChange={(event) => setDetails(event.target.value)} />
        <label className="reviews-form-label">Star rating:</label>
        <input className="reviews-form-input" type="number" value={starRating} onChange={(event) => setStarRating(parseInt(event.target.value))}
          min="0" max="5" />
        <button className="reviews-form-submit" type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default Reviews;



 


