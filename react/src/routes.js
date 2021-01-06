/*!
=========================================================
* Material Dashboard React - v1.9.0
=========================================================
* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// @material-ui/icons
//import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Search from "@material-ui/icons/Search";
//import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";

// core components/views for Admin layout
// import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import GiftList from "views/GiftList/GiftList.js";
import Friends from "views/Friends/friends.js";
import FriendRequests from "views/FriendRequests/friendRequests.js";
import SearchFriends from "views/searchFriends/searchFriends.js";
import FriendGiftList from "views/FriendGiftList/friendGiftList.js";
//import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";

const dashboardRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: Dashboard,
  //   component: DashboardPage,
  //   layout: "/admin"
  // },
  {
    path: "/user",
    name: "My Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/gift-list",
    name: "My Gift List",
    icon: "content_paste",
    component: GiftList,
    layout: "/admin"
  },
  {
    path: "/friends",
    name: "Friends",
    icon: LibraryBooks,
    component: Friends,
    layout: "/admin"
  },
  {
    path: "/friend-requests",
    name: "Friend Requests",
    icon: LibraryBooks,
    component: FriendRequests,
    layout: "/admin"
  },
  {
    path: "/search",
    name: "Search Friends",
    icon: Search,
    component: SearchFriends,
    layout: "/admin"
  },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // },
  {
    path: "/upgrade-to-pro",
    name: "Upgrade To PRO",
    icon: Unarchive,
    component: UpgradeToPro,
    layout: "/admin"
  }
];

export default dashboardRoutes;