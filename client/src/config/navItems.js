import React from "react"

import { Link } from "react-router-dom"
import PlusSquareIcon from "../assets/icons/feather-react/PlusSquareIcon"
import SearchBar from "../components/SearchBar"
import XIcon from "../assets/icons/feather-react/XIcon"
import SettingsIcon from "../assets/icons/feather-react/SettingsIcon"
import ChevronLeftIcon from "../assets/icons/feather-react/ChevronLeftIcon"

const navItems = {
  login: {
    middle: <h5>login</h5>
  },
  feed: {
    middle: <h5>jwl</h5>
  },
  search: {
    middle: <SearchBar />
  },
  add: {
    middle: <h5>Add</h5>
  },
  messages: {
    left: <PlusSquareIcon />,
    middle: <h5>Messages</h5>
  },
  "messages/:id": {
    left: <PlusSquareIcon />,
    middle: <h5>Message with</h5>
  },
  payments: {
    middle: <h5>Payments</h5>
  },
  "products/:id": {
    middle: <h5>View item</h5>
  },
  "store/:id": {
    left: (
      <Link to="/settings">
        <SettingsIcon />
      </Link>
    ),
    middle: <h5>Store</h5>
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
  settings: {
    left: <XIcon />,
    middle: <h5>Settings</h5>
  },
  "/settings/edit-profile": {
    left: (
      <Link to="/settings">
        <ChevronLeftIcon />
      </Link>
    ),
    middle: <h5>Edit Profile</h5>
  },
  "/settings/change-password": {
    left: (
      <Link to="/settings">
        <ChevronLeftIcon />
      </Link>
    ),
    middle: <h5>Change Password</h5>
  },
  "/settings/my-orders": {
    left: (
      <Link to="/settings">
        <ChevronLeftIcon />
      </Link>
    ),
    middle: <h5>My orders</h5>
  },
  "/settings/manage-cards": {
    left: (
      <Link to="/settings">
        <ChevronLeftIcon />
      </Link>
    ),
    middle: <h5>My payment cards</h5>
  },
  "/settings/logout": {
    left: (
      <Link to="/settings">
        <ChevronLeftIcon />
      </Link>
    ),
    middle: <h5>Log out</h5>
  }
}

export default navItems
