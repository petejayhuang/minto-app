import React from "react"

import Add from "../routes/Add"
import Feed from "../routes/Feed"
import Login from "../routes/Login"
import Messages from "../routes/Messages"
import Store from "../routes/Store"
import Payment from "../routes/Payment"
import Product from "../routes/Product"
import Search from "../routes/Search/"

import Settings from "../routes/Settings"
import EditProfile from "../routes/Settings/EditProfile"
import ChangePassword from "../routes/Settings/ChangePassword"
import MyOrders from "../routes/Settings/MyOrders"
import Order from "../routes/Order"
import NotFound from "../routes/NotFound"
import ManageCards from "../routes/Settings/ManageCards"
import Logout from "../routes/Settings/Logout"

const routes = [
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
  { path: "/settings/edit-profile", component: EditProfile, exact: true },
  { path: "/settings/change-password", component: ChangePassword, exact: true },
  { path: "/settings/manage-cards", component: ManageCards, exact: true },
  { path: "/settings/logout", component: Logout, exact: true },
  { path: "*", component: NotFound }
]

export default routes
