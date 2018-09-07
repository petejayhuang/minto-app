import React from 'react'
import findNavItem from '../utilities/findNavItem'

// ROUTES
import Add from '../routes/Add'
import Feed from '../routes/Feed'
import Landing from '../routes/Landing'
import Login from '../routes/Login'
import Logout from '../routes/Settings/Logout'
import Message from '../routes/Messages/Message'
import Messages from '../routes/Messages'
import NotFound from '../routes/NotFound'
import Product from '../routes/Product'
import Search from '../routes/Search'
import Settings from '../routes/Settings'
import Store from '../routes/Store'
import UpdateProfile from '../routes/Settings/UpdateProfile'

import { Link } from 'react-router-dom'
import ChevronLeftIcon from '../assets/icons/feather-react/ChevronLeftIcon'
import SettingsIcon from '../assets/icons/feather-react/SettingsIcon'
import XIcon from '../assets/icons/feather-react/XIcon'
import { PrivacyPolicy } from '../routes/PrivacyPolicy'

export const routes = [
  { path: '/', component: Landing, exact: true },
  { path: '/add', component: Add },
  { path: '/feed', component: Feed },
  { path: '/login', component: Login, exact: true },
  { path: '/messages', component: Messages, exact: true },
  { path: '/messages/:id', component: Message },
  { path: '/privacy-policy', component: PrivacyPolicy },
  { path: '/products/:id', component: Product },
  { path: '/search', component: Search, exact: true },
  { path: '/settings', component: Settings, exact: true },
  { path: '/settings/logout', component: Logout, exact: true },
  { path: '/settings/update-profile', component: UpdateProfile },
  { path: '/store/:id', component: Store },
  { path: '*', component: NotFound }
]

export const navItems = store => {
  const {
    location,
    user: { id }
  } = store
  const navItemsHash = {
    '': {
      middle: <h5 className="m-0 p-0">Minto</h5>
    },
    add: {
      middle: <h5 className="m-0 p-0">Add</h5>
    },
    feed: {
      middle: <h5 className="m-0 p-0">Feed</h5>
    },
    login: {
      middle: <h5 className="m-0 p-0">Login</h5>
    },
    messages: {
      middle: <h5 className="m-0 p-0">Messages</h5>
    },
    'messages/:id': {
      left: (
        <Link to="/messages">
          <ChevronLeftIcon />
        </Link>
      ),
      middle: <h5 className="m-0 p-0">Single Message</h5>
    },
    'privacy-policy': {
      left: (
        <Link to="/">
          <ChevronLeftIcon />
        </Link>
      ),
      middle: <h5 className="m-0 p-0">Privacy Policy</h5>
    },
    'products/:id': {
      middle: <h5 className="m-0 p-0">View item</h5>
    },
    search: {
      middle: <h5 className="m-0 p-0">Search</h5>
    },
    settings: {
      left: (
        <Link to={`/store/${id}`}>
          <XIcon />
        </Link>
      ),
      middle: <h5 className="m-0 p-0">Settings</h5>
    },
    '/settings/logout': {
      left: (
        <Link to="/settings">
          <ChevronLeftIcon />
        </Link>
      ),
      middle: <h5 className="m-0 p-0">Log out</h5>
    },
    '/settings/update-profile': {
      middle: <h5 className="m-0 p-0">Add a username</h5>
    },
    'store/:id': {
      left: (
        <Link to="/settings">
          <SettingsIcon />
        </Link>
      ),
      middle: <h5 className="m-0 p-0">Store</h5>
    }
  }

  return navItemsHash[findNavItem(location)]
}
