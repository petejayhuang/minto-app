import React from 'react'
import findNavItem from '../utilities/findNavItem'
import logo from '../assets/images/minto-logo.png'

// ROUTES
import Add from '../routes/Add'
import Addresses from '../routes/Settings/Addresses'
import BankDetails from '../routes/Settings/BankDetails'
import CreateEditAddress from '../routes/Settings/Addresses/CreateEditAddress'
import CreateUser from '../routes/CreateUser'
import Feed from '../routes/Feed'
import Landing from '../routes/Landing'
import Login from '../routes/Login'
import Logout from '../routes/Settings/Logout'
import Message from '../routes/Messages/Message'
import Messages from '../routes/Messages'
import NotFound from '../routes/NotFound'
import OrderConfirmation from '../routes/Payments/OrderConfirmation'
import Product from '../routes/Product'
import Search from '../routes/Search'
import Settings from '../routes/Settings'
import Store from '../routes/Store'
import UpdateUser from '../routes/UpdateUser'

import { Link } from 'react-router-dom'
import ChevronLeftIcon from '../assets/icons/feather-react/ChevronLeftIcon'
import SettingsIcon from '../assets/icons/feather-react/SettingsIcon'
import XIcon from '../assets/icons/feather-react/XIcon'

export const routes = [
  { path: '/', component: Landing, exact: true },
  { path: '/add', component: Add },
  { path: '/create-account', component: CreateUser },
  { path: '/feed', component: Feed },
  { path: '/login', component: Login, exact: true },
  { path: '/messages', component: Messages, exact: true },
  { path: '/messages/:id', component: Message },
  { path: '/order-confirmation', component: OrderConfirmation },
  { path: '/products/:id', component: Product },
  { path: '/search', component: Search, exact: true },
  { path: '/settings', component: Settings, exact: true },
  { path: '/settings/addresses', component: Addresses, exact: true },
  {
    path: '/settings/addresses/add',
    component: CreateEditAddress,
    exact: true
  },
  { path: '/settings/addresses/:id', component: CreateEditAddress },
  { path: '/settings/bank-details', component: BankDetails },
  { path: '/settings/logout', component: Logout, exact: true },
  { path: '/settings/update-account', component: UpdateUser, exact: true },
  { path: '/store/:id', component: Store },
  { path: '*', component: NotFound }
]

export const navItems = ({ store, history }) => {
  const {
    routing: { location },
    user: { id }
  } = store

  const navItemsHash = {
    '': {
      middle: <img alt="logo" className="logo" src={logo} />
    },
    add: {
      middle: <h5 className="m-0 p-0">Add</h5>
    },
    'create-account': {
      middle: <h5 className="m-0 p-0">Create a Minto Account</h5>
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
    'order-confirmation': {
      middle: <h5 className="m-0 p-0">Order Confirmation</h5>
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
      left: renderProductBackButton(history),
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
    '/settings/addresses': {
      left: (
        <Link to="/settings">
          <ChevronLeftIcon />
        </Link>
      ),
      middle: <h5 className="m-0 p-0">All Addresses</h5>
    },
    '/settings/addresses/add': {
      left: (
        <Link to="/settings">
          <ChevronLeftIcon />
        </Link>
      ),
      middle: <h5 className="m-0 p-0">Add address</h5>
    },
    '/settings/addresses/:id': {
      left: (
        <Link to="/settings/addresses">
          <ChevronLeftIcon />
        </Link>
      ),
      middle: <h5 className="m-0 p-0">Edit address</h5>
    },
    '/settings/bank-details': {
      left: (
        <Link to="/settings">
          <ChevronLeftIcon />
        </Link>
      ),
      middle: <h5 className="m-0 p-0">Bank Details</h5>
    },
    '/settings/logout': {
      left: (
        <Link to="/settings">
          <ChevronLeftIcon />
        </Link>
      ),
      middle: <h5 className="m-0 p-0">Log out</h5>
    },
    '/settings/update-account': {
      middle: <h5 className="m-0 p-0">Update your details</h5>
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

const renderProductBackButton = history => {
  switch (history.action) {
    case 'PUSH':
      return (
        <div className="top-nav-link" onClick={() => history.go(-1)}>
          Back
        </div>
      )
    default:
      return null
  }
}
