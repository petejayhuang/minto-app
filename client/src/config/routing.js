import React from 'react'

// ROUTES
import Add from '../routes/Add'
import AddCard from '../routes/Settings/PaymentDetails/AddCard'
import AccountDetails from '../routes/Settings/AccountDetails'
import BecomeASeller from '../routes/Settings/BecomeASeller'
import Feed from '../routes/Feed'
import Landing from '../routes/Landing'
import Likes from '../routes/Likes'
import Login from '../routes/Login'
import Logout from '../routes/Settings/Logout'
import Message from '../routes/Messages/Message'
import Messages from '../routes/Messages'
import MyOrders from '../routes/Settings/MyOrders'
import NotFound from '../routes/NotFound'
import Notifications from '../routes/Notifications'
import Order from '../routes/Order'
import PaymentDetails from '../routes/Settings/PaymentDetails'
import Product from '../routes/Product'
import Reviews from '../routes/Settings/Reviews'
import Search from '../routes/Search'
import Settings from '../routes/Settings'
import ShoppingCart from '../routes/ShoppingCart'
import Store from '../routes/Store'

// FOR NAV ITEMS
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '../assets/icons/feather-react/ChevronLeftIcon'
import PlusSquareIcon from '../assets/icons/feather-react/PlusSquareIcon'
import SettingsIcon from '../assets/icons/feather-react/SettingsIcon'
import ShoppingCartIcon from '../assets/icons/feather-react/ShoppingCartIcon'
import XIcon from '../assets/icons/feather-react/XIcon'

export const routes = [
  { path: '/', component: Landing, exact: true },
  { path: '/add', component: Add },
  { path: '/become-a-seller', component: BecomeASeller },
  { path: '/feed', component: Feed },
  { path: '/likes', component: Likes, exact: true },
  { path: '/login', component: Login, exact: true },
  { path: '/messages', component: Messages, exact: true },
  { path: '/messages/:id', component: Message },
  { path: '/notifications', component: Notifications },
  { path: '/orders', component: MyOrders, exact: true },
  { path: '/orders/:id', component: Order, exact: true },
  { path: '/products/:id', component: Product },
  { path: '/reviews', component: Reviews, exact: true },
  { path: '/search', component: Search, exact: true },
  { path: '/settings', component: Settings, exact: true },
  { path: '/settings/account-details', component: AccountDetails, exact: true },
  { path: '/settings/add-card', component: AddCard, exact: true },
  { path: '/settings/payment-details', component: PaymentDetails, exact: true },
  { path: '/settings/logout', component: Logout, exact: true },
  { path: '/shopping-cart', component: ShoppingCart, exact: true },
  { path: '/store/:id', component: Store },
  { path: '*', component: NotFound }
]

export const navItems = {
  '': {
    middle: <h5 className="m-0 p-0">Home</h5>,
    right: (
      <Link to="/shopping-cart">
        <ShoppingCartIcon />
      </Link>
    )
  },
  add: {
    middle: <h5 className="m-0 p-0">Add</h5>,
    right: (
      <Link to="/shopping-cart">
        <ShoppingCartIcon />
      </Link>
    ),
    rightOnClick: () => {
      console.log('clicked!')
    }
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
    middle: <h5 className="m-0 p-0">Feed</h5>,
    right: (
      <Link to="/shopping-cart">
        <ShoppingCartIcon />
      </Link>
    )
  },
  likes: {
    left: (
      <Link to="/settings">
        <ChevronLeftIcon />
      </Link>
    ),
    middle: <h5 className="m-0 p-0">Likes</h5>,
    right: (
      <Link to="/likes">
        <ShoppingCartIcon />
      </Link>
    )
  },
  login: {
    middle: <h5 className="m-0 p-0">Login</h5>,
    right: (
      <Link to="/shopping-cart">
        <ShoppingCartIcon />
      </Link>
    )
  },
  messages: {
    left: <PlusSquareIcon />,
    middle: <h5 className="m-0 p-0">Messages</h5>,
    right: (
      <Link to="/shopping-cart">
        <ShoppingCartIcon />
      </Link>
    )
  },
  'messages/:id': {
    left: (
      <Link to="/messages">
        <ChevronLeftIcon />
      </Link>
    ),
    middle: <h5 className="m-0 p-0">Single Message</h5>,
    right: (
      <Link to="/shopping-cart">
        <ShoppingCartIcon />
      </Link>
    )
  },
  notifications: {
    left: (
      <Link to="/settings">
        <ChevronLeftIcon />
      </Link>
    ),
    middle: <h5 className="m-0 p-0">Notifications</h5>,
    right: (
      <Link to="/shopping-cart">
        <ShoppingCartIcon />
      </Link>
    )
  },
  orders: {
    left: (
      <Link to="/settings">
        <ChevronLeftIcon />
      </Link>
    ),
    middle: <h5 className="m-0 p-0">All Orders</h5>,
    right: (
      <Link to="/shopping-cart">
        <ShoppingCartIcon />
      </Link>
    )
  },
  'orders/:id': {
    left: (
      <Link to="/orders">
        <ChevronLeftIcon />
      </Link>
    ),
    middle: <h5 className="m-0 p-0">Single Order</h5>,
    right: (
      <Link to="/shopping-cart">
        <ShoppingCartIcon />
      </Link>
    )
  },
  'products/:id': {
    middle: <h5 className="m-0 p-0">View item</h5>,
    right: (
      <Link to="/shopping-cart">
        <ShoppingCartIcon />
      </Link>
    )
  },
  reviews: {
    left: (
      <Link to="/settings">
        <ChevronLeftIcon />
      </Link>
    ),
    middle: <h5 className="m-0 p-0">Reviews</h5>,
    right: (
      <Link to="/shopping-cart">
        <ShoppingCartIcon />
      </Link>
    )
  },
  search: {
    middle: <h5 className="m-0 p-0">Search</h5>,
    right: (
      <Link to="/shopping-cart">
        <ShoppingCartIcon />
      </Link>
    )
  },
  settings: {
    left: (
      <Link to="/store/1">
        <XIcon />
      </Link>
    ),
    middle: <h5 className="m-0 p-0">Settings</h5>,
    right: (
      <Link to="/shopping-cart">
        <ShoppingCartIcon />
      </Link>
    )
  },
  '/settings/account-details': {
    left: (
      <Link to="/settings">
        <ChevronLeftIcon />
      </Link>
    ),
    middle: <h5 className="m-0 p-0">Account Details</h5>,
    right: (
      <Link to="/shopping-cart">
        <ShoppingCartIcon />
      </Link>
    )
  },
  '/settings/add-card': {
    left: (
      <Link to="/settings/payment-details">
        <ChevronLeftIcon />
      </Link>
    ),
    middle: <h5 className="m-0 p-0">Add card</h5>,
    right: (
      <Link to="/shopping-cart">
        <ShoppingCartIcon />
      </Link>
    )
  },
  '/settings/payment-details': {
    left: (
      <Link to="/settings">
        <ChevronLeftIcon />
      </Link>
    ),
    middle: <h5 className="m-0 p-0">Payment Details</h5>,
    right: (
      <Link to="/shopping-cart">
        <ShoppingCartIcon />
      </Link>
    )
  },
  '/settings/logout': {
    left: (
      <Link to="/settings">
        <ChevronLeftIcon />
      </Link>
    ),
    middle: <h5 className="m-0 p-0">Log out</h5>,
    right: (
      <Link to="/shopping-cart">
        <ShoppingCartIcon />
      </Link>
    )
  },
  'shopping-cart': {
    middle: <h5 className="m-0 p-0">Shopping Cart</h5>
  },
  'store/:id': {
    left: (
      <Link to="/settings">
        <SettingsIcon />
      </Link>
    ),
    middle: <h5 className="m-0 p-0">Store</h5>,
    right: (
      <Link to="/shopping-cart">
        <ShoppingCartIcon />
      </Link>
    )
  }
}
