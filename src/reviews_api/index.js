// export async function getAllReviewsByProductId(productId) {
//     const response = await fetch(`/api/reviews/${productId}/reviews`);
//     const reviews = await response.json();
//     return reviews;
//   }
  
//   export async function createReview(productId, review) {
//     const response = await fetch(`/api/reviews/${productId}/reviews`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(review),
//     });
//     const newReview = await response.json();
//     return newReview;
//   }
  const localstoragetoken  = window.localStorage.getItem("token")

export async function getAllReviewsByProductId(productId) {
console.log('productId :>> ', productId);
  const response = await fetch(`https://farmers-market-1oeq.onrender.com/api/reviews/${productId}/reviews`, {
    headers: {
      Authorization: `Bearer ${localstoragetoken}`
    }
  });
  const reviews = await response.json();
  console.log("reviews", reviews)
  console.log('reviews :>> ', reviews);
  return reviews;
  
}

export async function createReview(productId, review, token) {
  const response = await fetch(`https://farmers-market-1oeq.onrender.com/api/reviews/${productId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localstoragetoken}`
    },
    body: JSON.stringify(review),
  });
  const newReview = await response.json();
  return newReview;
}
