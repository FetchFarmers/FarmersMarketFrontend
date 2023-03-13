import React, { useState, useEffect } from 'react';
import { getAllReviewsByProductId, createReview } from '../../reviews_api/index.js';
import './review.css';
import ReviewsList from './ReviewsList';

function ReviewForm({ productId }) {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [starRating, setStarRating] = useState('');
  const [product, setProduct] = useState(productId);
  const [reviews, setReviews] = useState([]);

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

  useEffect(() => {
    async function fetchReviews() {
      const reviews = await getAllReviewsByProductId(productId);
      setReviews(reviews);
    }
    fetchReviews();
  }, [productId]);

  return (
    <div className="reviews-container">
      <form className="reviews-form" onSubmit={handleSubmit}>
        <label className="reviews-form-label" htmlFor="product">Product Id:</label>
        <input className="reviews-form-input" type="text" id="product" value={product} onChange={(event) => setProduct(event.target.value)} required />

        <label className="reviews-form-label" htmlFor="title">Title:</label>
        <input className="reviews-form-input" type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} required />

        <label className="reviews-form-label" htmlFor="details">Details:</label>
        <textarea className="reviews-form-input" id="details" value={details} onChange={(event) => setDetails(event.target.value)} required />

        <label className="reviews-form-label" htmlFor="starRating">Star Rating:</label>
        <input className="reviews-form-input" type="number" id="starRating" min="1" max="5" value={starRating} onChange={(event) => setStarRating(event.target.value)} required />

        <button className="reviews-form-submit" type="submit">Submit Review</button>
      </form>
      <div className="reviews-list">
        <h2>Reviews:</h2>
        <ReviewsList reviews={reviews} />
      </div>
    </div>
  );
}

export default ReviewForm;


 




