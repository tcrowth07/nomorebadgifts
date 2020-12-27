import React from "react";
//import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Switch } from "react-router-dom";

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
import AdminPage from "views/Admin/admin.js";
import HomePage from "views/Home/Home.js";
import Admin from "layouts/Admin.js";

export default function App() {

  return (
    <BrowserRouter>
        <Switch>
          <Route path="/quiz" component={QuizPage} />
          <Route path="/hobbies" component={HobbiesPage} />
          <Route path="/results-page" component={ResultsPage} />
          <Route path="/gift-list" component={GiftListPage} />
          <Route path="/profile-page" component={ProfilePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/questionadmin" component={AdminPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/admin" component={Admin} />
          <Route path="/" component={LandingPage} />
        </Switch>
    </BrowserRouter>
  );
}
