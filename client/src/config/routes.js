import React from 'react'

import Add from '../routes/Add'
import Feed from '../routes/Feed'
import Landing from '../routes/Landing'
import Messages from '../routes/Messages'
import Store from '../routes/Store'
import Product from '../routes/Product'
import Search from '../routes/Search/'

import Settings from '../routes/Settings'
import EditProfile from '../routes/Settings/EditProfile'
import ChangePassword from '../routes/Settings/ChangePassword'
import MyOrders from '../routes/Settings/MyOrders'
import Order from '../routes/Order'
import NotFound from '../routes/NotFound'

const routes = [
  { path: '/login', component: Landing, exact: true },
  { path: '/feed', component: Feed },
  { path: '/add', component: Add },
  { path: '/messages', component: Messages, exact: true },
  { path: '/messages/:id', component: Messages },
  { path: '/store/:id', component: Store },
  { path: '/orders', component: MyOrders, exact: true },
  { path: '/orders/:id', component: Order, exact: true },
  { path: '/products/:id', component: Product },
  { path: '/search', component: Search, exact: true },
  // { path: '/search?*', component: Search },
  { path: '/settings', component: Settings, exact: true },
  { path: '/settings/edit-profile', component: EditProfile, exact: true },
  { path: '/settings/change-password', component: ChangePassword, exact: true },
  { path: '*', component: NotFound }
]

export default routes
