import React from 'react'
import { Link } from 'react-router-dom'
import PlusSquareIcon from '../assets/icons/feather-react/PlusSquareIcon'
import SearchBar from '../components/SearchBar'
import XIcon from '../assets/icons/feather-react/XIcon'
import SettingsIcon from '../assets/icons/feather-react/SettingsIcon'
import ChevronLeftIcon from '../assets/icons/feather-react/ChevronLeftIcon'

const navItems = {
  '/feed': {
    middle: <h3>jwl</h3>
  },
  '/search': {
    middle: <SearchBar />
  },
  '/add': {
    middle: <h3>Add</h3>
  },
  '/messages': {
    left: <PlusSquareIcon />,
    middle: <h3>Messages</h3>
  },
  '/profile': {
    left: (
      <Link to="/settings">
        <SettingsIcon />
      </Link>
    ),
    middle: <h3>Profile</h3>
  },
  '/settings': {
    left: (
      <Link to="/profile">
        <XIcon />
      </Link>
    ),
    middle: <h3>Settings</h3>
  },
  '/settings/edit-profile': {
    left: (
      <Link to="/settings">
        <ChevronLeftIcon />
      </Link>
    ),
    middle: <h3>Edit Profile</h3>
  }
}

export default navItems
