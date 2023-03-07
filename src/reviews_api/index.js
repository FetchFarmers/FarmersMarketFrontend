export async function getAllReviewsByProductId(productId) {
    const response = await fetch(`/api/reviews/${productId}/reviews`);
    const reviews = await response.json();
    return reviews;
  }
  
  export async function createReview(productId, review) {
    const response = await fetch(`/api/reviews/${productId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });
    const newReview = await response.json();
    return newReview;
  }
  