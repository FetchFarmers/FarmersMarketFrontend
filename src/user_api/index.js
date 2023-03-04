//! This is where we will make all the User API calls 

export async function fetchLogin(username, password) {
  
  try {
    const response = await fetch(`https://farmers-market-1oeq.onrender.com/api/users/login`, {
      method: "POST",
      headers: {
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          username: username,
          password: password,
        }
      )
    })       
    const data = await response.json();
    console.log('loginUserData :>> ', data);
  
    return data;
  } catch (error) {
    throw error;
  }
}

//curl http://localhost:3000/api/users/login -H "Content-Type: application/json" -X POST -d '{"username": "hollye", "password": "fruit&veg"}' 
