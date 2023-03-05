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

export const fetchUserData = async (token) => {
  try {
    const response = await fetch('https://farmers-market-1oeq.onrender.com/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error(error);
  }
};

export async function fetchSignUp(username, password, email) {
  
  try {
    const response = await fetch(`https://farmers-market-1oeq.onrender.com/api/users/register`, {
      method: "POST",
      headers: {
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          username: username,
          password: password,
          email: email,
        }
      )
    })       
    const data = await response.json();
    console.log('signUpUserData :>> ', data);
  
    return data;
  } catch (error) {
    throw error;
  }
}
