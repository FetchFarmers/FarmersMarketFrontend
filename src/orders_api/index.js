//! This is where we will make all the orders API calls '
  
const setHeader = () => {
  const token = window.localStorage.getItem("token")
  console.log("🚀 ~ file: index.js:4 ~ token:", token)

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
    const [data] = await response.json();
    console.log('data :>> ', data);
    console.log('header :>> ', header);

    return data;
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
    console.log('data :>> ', data);

    return data;
  } catch (error) {
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