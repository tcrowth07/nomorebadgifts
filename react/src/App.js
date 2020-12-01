import React, { useState, useEffect } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import Axios from "axios";

import "assets/scss/material-kit-react.scss?v=1.9.0";
import "assets/css/material-dashboard-react.css?v=1.9.0";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import RegisterPage from "views/RegisterPage/RegisterPage.js";
import QuizPage from "views/QuizPage/QuizPage.js";
import HobbiesPage from "views/HobbiesPage/HobbiesPage.js";
import ResultsPage from "views/ResultsPage/ResultsPage.js";
import GiftListPage from "views/GiftListPage/GiftListPage.js";
import FriendsPage from "views/FriendsPage/FriendsPage.js";
import AdminPage from "views/Admin/admin.js";
import HomePage from "views/Home/Home.js";
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import UserContext from "./context/userContext.js";

export default function App() {
  var hist = createBrowserHistory();
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if(token === null){
          localStorage.setItem("auth-token", "");
          token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenisvalid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if(tokenRes.data){
        const userRes = await Axios.get(
            "http://localhost:5000/users/",
            { headers: { "x-auth-token": token } }
          );
        setUserData({
            token,
            user: userRes.data
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <Router history={hist}>
        <UserContext.Provider value={{ userData, setUserData }}>
        <Switch>
          <Route path="/quiz" component={QuizPage} />
          <Route path="/hobbies" component={HobbiesPage} />
          <Route path="/friends-page" component={FriendsPage} />
          <Route path="/results-page" component={ResultsPage} />
          <Route path="/gift-list" component={GiftListPage} />
          <Route path="/profile-page" component={ProfilePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/questionadmin" component={AdminPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/admin" component={Admin} />
          <Route path="/rtl" component={RTL} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}
