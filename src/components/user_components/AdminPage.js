import React, { useState, useEffect } from "react";
import { fetchUserData } from "../../user_api";
import CreateProduct from "../products_components/admin/CreateProduct";

function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(window.localStorage.getItem('token'));

  useEffect(() => {
    const getUserData = async () => {
      if (token) {
        const userData = await fetchUserData(token);
        setIsAdmin(userData.isAdmin);
      }
    };
    getUserData();
  }, [token]);

  if (isAdmin) {
    return (
      <div>
        <h1>Welcome, Admin!</h1>
        <CreateProduct />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Access denied</h1>
      </div>
    );
  }
}

export default AdminPage;
