//! This is where we will make all the orders API calls '
  
const setHeader = () => {
  const token = window.localStorage.getItem("token")

  if (token) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ token }`
    }
  } else {
    return {
      'Content-Type': 'application/json',
    }
  }
}

export async function fetchUserOpenOrders(sessionId) {
  
  try {
    const header = setHeader()

    const url = `https://farmers-market-1oeq.onrender.com/api/orders/user/open`;
    const response = await fetch(url, {
      method: "POST",
      headers: header,
      body: JSON.stringify(
        {
          sessionId: sessionId,
        }
      )
    });
    const data = await response.json();

    if (data[0]) {
      return data[0]
    } else {
      return {error: "No open orders"}
    }

  } catch (error) {
    throw error;
  }
}

export async function fetchAddToOrder( sessionId, productId, quantity) {
  
  try {
    const header = setHeader()

    const url = `https://farmers-market-1oeq.onrender.com/api/orders/user/open/add_product`;
    const response = await fetch(url, {
      method: "POST",
      headers: header,
      body: JSON.stringify(
        {
          sessionId: sessionId,
          productId: productId, 
          quantity: quantity
        }
      )
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchUpdateOrderProductQuantity(orderProductId, quantity) {
  try {
    const url = `https://farmers-market-1oeq.onrender.com/api/orders/user/open/order_products/${orderProductId}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          quantity: quantity
        }
      )
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchRemoveOrderProduct(orderProductId) {
  try {
    const url = `https://farmers-market-1oeq.onrender.com/api/orders/user/open/order_products/${orderProductId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      }});
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchCheckout(orderId, orderSum, date) {
  try {
    const url = `https://farmers-market-1oeq.onrender.com/api/orders/user/open/${orderId}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          checkoutSum: orderSum, 
          checkoutDate: date,
        }
      )
    });
    const data = await response.json();
    
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchCancelOrder(orderId){
  
  try {
    const url = `https://farmers-market-1oeq.onrender.com/api/orders/user/open/${orderId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      }});
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }

}

export async function fetchAllOpenOrders() {

  try {

    const url = `https://farmers-market-1oeq.onrender.com/api/orders/open`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }});

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }

}

export async function fetchStripe() {

  try {
    const url = `https://farmers-market-1oeq.onrender.com/api/config`;
    const response = await fetch(url, {
      method: "GET", 
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    const data = await response.json()

    return data;
  } catch(error) {
    throw error;
  }

}

export async function fetchStripePaymentIntent(checkoutPrice) {

  try {
    const url = `https://farmers-market-1oeq.onrender.com/api/create-payment-intent`;
    const response = await fetch(url, {
      method: "POST", 
      headers: {
        'Content-Type': 'application/json',
      },     
      body: JSON.stringify(
        {
          checkoutPrice: checkoutPrice
        }
      )
    })
    
    const data = await response.json()

    return data;
  } catch(error) {
    throw error;
  }

}

// Below are my comments with error handling and input validation

// const setHeader = () => {
//   const token = window.localStorage.getItem("token")

//   if (token) {
//     return {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${ token }`
//     }
//   } else {
//     return {
//       'Content-Type': 'application/json',
//     }
//   }
// }

// export async function fetchUserOpenOrders(sessionId) {
//   if (!sessionId) {
//     throw new Error('Session ID must be provided.');
//   }
  
//   try {
//     const header = setHeader()

//     const url = `https://farmers-market-1oeq.onrender.com/api/orders/user/open`;
//     const response = await fetch(url, {
//       method: "POST",
//       headers: header,
//       body: JSON.stringify(
//         {
//           sessionId: sessionId,
//         }
//       )
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch user open orders.');
//     }

//     const [data] = await response.json();
//     console.log('data :>> ', data);
//     console.log('header :>> ', header);

//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function fetchAddToOrder(sessionId, productId, quantity) {
//   if (!sessionId || !productId || !quantity) {
//     throw new Error('Session ID, product ID, and quantity must be provided.');
//   }
  
//   try {
//     const header = setHeader()

//     const url = `https://farmers-market-1oeq.onrender.com/api/orders/user/open/add_product`;
//     const response = await fetch(url, {
//       method: "POST",
//       headers: header,
//       body: JSON.stringify(
//         {
//           sessionId: sessionId,
//           productId: productId, 
//           quantity: quantity
//         }
//       )
//     });

//     if (!response.ok) {
//       throw new Error('Failed to add product to order.');
//     }

//     const data = await response.json();
//     console.log('data :>> ', data);

//     return data;
//   } catch (error) {
//     throw error;
//   }
// }