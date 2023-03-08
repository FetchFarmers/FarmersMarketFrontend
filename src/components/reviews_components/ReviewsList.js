// Import the necessary modules and functions
import React from 'react';

// Define a functional component ReviewList that takes reviews as input
function ReviewList({ reviews }) {
  // Render a div element
  return (
    <div>
      {/* Use the map method to iterate over the reviews array and render a div element for each review */}
      {reviews.map((review) => (
        <div key={review.id}>
          {/* Render the title, details and star rating of the review */}
          <h3>{review.title}</h3>
          <p>{review.details}</p>
          <p>{review.starRating}/5</p>
          {/* Render a horizontal line to separate the reviews */}
          <hr />
        </div>
      ))}
    </div>
  );
}

// Export the component as default
export default ReviewList;

