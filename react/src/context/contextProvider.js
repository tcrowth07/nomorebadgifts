import React, { useState, useEffect } from "react";
import AppContext from "./userContext.js";
import App from "../App.js";
import Axios from "axios";

/** The context provider for our app */
export default function AppProvider() {
  const [userData, setUserData] = useState({
    token: "",
    user: "",
  });

  useEffect(() => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    }
    Axios.post("http://localhost:5000/users/tokenisvalid", null, {
      headers: { "x-auth-token": token },
    }).then(async (tokenRes) => {
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    });
  }, []);

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <AppContext.Provider value={{ userData, setUserData, logout }}>
      <App />
    </AppContext.Provider>
  );
}
