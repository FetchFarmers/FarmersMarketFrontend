//! This is where we will make all the orders API calls 

// * this is how they called the functions on art collector - they didn't export at the bottom just imported at top of page where used
export async function fetchUserOpenOrders(token, sessionId) {
  
  try {
    //!!once you can add test this with passing in a token - generate an if statement to check if token in local storage and if not pass exclude the bearer token
    const url = `https://farmers-market-1oeq.onrender.com/api/orders/user/open`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ token }`
      },
      body: JSON.stringify(
        {
          sessionId: sessionId,
        }
      )
    });
    const [data] = await response.json();
    console.log('data :>> ', data);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchAddToOrder(token, sessionId, productId, quantity) {
  
  try {
    //!!once you can add test this with passing in a token - generate an if statement to check if token in local storage and if not pass exclude the bearer token
    const url = `https://farmers-market-1oeq.onrender.com/api/orders/user/open/add_product`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ token }`
      },
      body: JSON.stringify(
        {
          sessionId: sessionId,
          productId: productId, 
          quantity: quantity
        }
      )
    });
    const data = await response.json();
    console.log('data :>> ', data);

    return data;
  } catch (error) {
    throw error;
  }
}
