import React, { useState } from 'react';
import { createReview } from '../api';

function ReviewForm({ productId }) {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [starRating, setStarRating] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const review = await createReview(productId, { title, details, starRating });
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
