import React from 'react';

function ReviewList({ reviews }) {
  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id}>
          <h3>{review.title}</h3>
          <p>{review.details}</p>
          <p>{review.starRating}/5</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
