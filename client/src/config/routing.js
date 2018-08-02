import React from 'react'

// ROUTES
import Add from '../routes/Add'
import BecomeASeller from '../routes/Settings/BecomeASeller'
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

// FOR NAV ITEMS
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '../assets/icons/feather-react/ChevronLeftIcon'
import MailIcon from '../assets/icons/feather-react/MailIcon'
import MoreVerticalIcon from '../assets/icons/feather-react/MoreVerticalIcon'
import SettingsIcon from '../assets/icons/feather-react/SettingsIcon'
import XIcon from '../assets/icons/feather-react/XIcon'

export const routes = [
  { path: '/', component: Landing, exact: true },
  { path: '/add', component: Add },
  { path: '/become-a-seller', component: BecomeASeller },
  { path: '/feed', component: Feed },
  { path: '/login', component: Login, exact: true },
  { path: '/messages', component: Messages, exact: true },
  { path: '/messages/:id', component: Message },
  { path: '/products/:id', component: Product },
  { path: '/search', component: Search, exact: true },
  { path: '/settings', component: Settings, exact: true },
  { path: '/settings/logout', component: Logout, exact: true },
  { path: '/store/:id', component: Store },
  { path: '*', component: NotFound }
]

export const navItems = {
  '': {
    middle: <h5 className="m-0 p-0">Home</h5>
  },
  add: {
    middle: <h5 className="m-0 p-0">Add</h5>
  },
  'become-a-seller': {
    left: (
      <Link to="/settings">
        <ChevronLeftIcon />
      </Link>
    ),
    middle: <h5 className="m-0 p-0">Become a seller</h5>
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
        <MailIcon />
      </Link>
    ),
    middle: <h5 className="m-0 p-0">Single Message</h5>,
    right: <MoreVerticalIcon />
  },
  'products/:id': {
    middle: <h5 className="m-0 p-0">View item</h5>
  },
  search: {
    middle: <h5 className="m-0 p-0">Search</h5>
  },
  settings: {
    left: (
      <Link to="/store/1">
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
  'store/:id': {
    left: (
      <Link to="/settings">
        <SettingsIcon />
      </Link>
    ),
    middle: <h5 className="m-0 p-0">Store</h5>
  }
}
