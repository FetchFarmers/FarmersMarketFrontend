//! This is where we will make all the orders API calls 

// * this is how they called the functions on art collector - they didn't export at the bottom just imported at top of page where used
export async function fetchUserOpenOrders(token, sessionId) {
  
  try {
    const url = `https://farmers-market-1oeq.onrender.com/api/orders/user/open`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${ token }`
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