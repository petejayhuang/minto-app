import React from "react"

// ROUTES
import Add from "../routes/Add"
import ChangePassword from "../routes/Settings/ChangePassword"
import EditProfile from "../routes/Settings/EditProfile"
import Feed from "../routes/Feed"
import Landing from "../routes/Landing"
import Login from "../routes/Login"
import Logout from "../routes/Settings/Logout"
import ManageCards from "../routes/Settings/ManageCards"
import Messages from "../routes/Messages"
import MyOrders from "../routes/Settings/MyOrders"
import NotFound from "../routes/NotFound"
import Order from "../routes/Order"
import Store from "../routes/Store"
import Payment from "../routes/Payment"
import Product from "../routes/Product"
import Search from "../routes/Search/"
import Settings from "../routes/Settings"

// FOR NAV ITEMS
import { Link } from "react-router-dom"
import ChevronLeftIcon from "../assets/icons/feather-react/ChevronLeftIcon"
import PlusSquareIcon from "../assets/icons/feather-react/PlusSquareIcon"
import SettingsIcon from "../assets/icons/feather-react/SettingsIcon"
import XIcon from "../assets/icons/feather-react/XIcon"

export const routes = [
  { path: "/", component: Landing, exact: true },
  { path: "/login", component: Login, exact: true },
  { path: "/feed", component: Feed },
  { path: "/add", component: Add },
  { path: "/messages", component: Messages, exact: true },
  { path: "/messages/:id", component: Messages },
  { path: "/store/:id", component: Store },
  { path: "/orders", component: MyOrders, exact: true },
  { path: "/orders/:id", component: Order, exact: true },
  { path: "/payments", component: Payment },
  { path: "/products/:id", component: Product },
  { path: "/search", component: Search, exact: true },
  // { path: '/search?*', component: Search },
  { path: "/settings", component: Settings, exact: true },
  { path: "/settings/change-password", component: ChangePassword, exact: true },
  { path: "/settings/edit-profile", component: EditProfile, exact: true },
  { path: "/settings/logout", component: Logout, exact: true },
  { path: "/settings/manage-cards", component: ManageCards, exact: true },
  { path: "*", component: NotFound }
]

export const navItems = {
  "": {
    middle: <h5>Home</h5>
  },
  add: {
    middle: <h5>Add</h5>
  },
  feed: {
    middle: <h5>jwl</h5>
  },
  login: {
    middle: <h5>login</h5>
  },
  messages: {
    left: <PlusSquareIcon />,
    middle: <h5>Messages</h5>
  },
  "messages/:id": {
    left: <PlusSquareIcon />,
    middle: <h5>Message with</h5>
  },
  orders: {
    left: (
      <Link to="/settings">
        <ChevronLeftIcon />
      </Link>
    ),
    middle: <h5>All Orders</h5>
  },
  "orders/:id": {
    left: (
      <Link to="/orders">
        <ChevronLeftIcon />
      </Link>
    ),
    middle: <h5>Single Order</h5>
  },
  payments: {
    middle: <h5>Payments</h5>
  },
  "products/:id": {
    middle: <h5>View item</h5>
  },
  search: {
    middle: <h5>Search</h5>
  },
  "search-results": {
    middle: <h5>Search Results</h5>
  },
  settings: {
    left: <XIcon />,
    middle: <h5>Settings</h5>
  },
  "/settings/change-password": {
    left: (
      <Link to="/settings">
        <ChevronLeftIcon />
      </Link>
    ),
    middle: <h5>Change Password</h5>
  },
  "/settings/edit-profile": {
    left: (
      <Link to="/settings">
        <ChevronLeftIcon />
      </Link>
    ),
    middle: <h5>Edit Profile</h5>
  },
  "/settings/logout": {
    left: (
      <Link to="/settings">
        <ChevronLeftIcon />
      </Link>
    ),
    middle: <h5>Log out</h5>
  },
  "/settings/manage-cards": {
    left: (
      <Link to="/settings">
        <ChevronLeftIcon />
      </Link>
    ),
    middle: <h5>My payment cards</h5>
  },
  "/settings/my-orders": {
    left: (
      <Link to="/settings">
        <ChevronLeftIcon />
      </Link>
    ),
    middle: <h5>My orders</h5>
  },
  "store/:id": {
    left: (
      <Link to="/settings">
        <SettingsIcon />
      </Link>
    ),
    middle: <h5>Store</h5>
  }
}
