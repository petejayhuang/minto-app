import React from "react"
import { Link } from "react-router-dom"
import PlusSquareIcon from "../assets/icons/feather-react/PlusSquareIcon"
import SearchBar from "../components/SearchBar"
import XIcon from "../assets/icons/feather-react/XIcon"
import SettingsIcon from "../assets/icons/feather-react/SettingsIcon"
import ChevronLeftIcon from "../assets/icons/feather-react/ChevronLeftIcon"

const navItems = {
  "/feed": {
    middle: <h5>jwl</h5>
  },
  "/search": {
    middle: <SearchBar />
  },
  "/add": {
    middle: <h5>Add</h5>
  },
  "/messages": {
    left: <PlusSquareIcon />,
    middle: <h5>Messages</h5>
  },
  "/messages/": {
    left: <PlusSquareIcon />,
    middle: <h5>Message with</h5>
  },
  "/profile": {
    left: (
      <Link to="/settings">
        <SettingsIcon />
      </Link>
    ),
    middle: <h5>Profile</h5>
  },
  "/settings": {
    left: (
      <Link to="/profile">
        <XIcon />
      </Link>
    ),
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
  }
}

export default navItems
