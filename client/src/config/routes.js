import Add from "../routes/Add"
import Feed from "../routes/Feed"
import Landing from "../routes/Landing"
import Messages from "../routes/Messages"
import Store from "../routes/Store"
import Product from "../routes/Product"
import Search from "../routes/Search"

import Settings from "../routes/Settings"
import SettingsList from "../routes/Settings/SettingsList"
import EditProfile from "../routes/Settings/EditProfile"
import ChangePassword from "../routes/Settings/ChangePassword"

const routes = [
  { exact: true, path: "/login", component: Landing },
  { exact: false, path: "/feed", component: Feed },
  { exact: false, path: "/store", component: Store },
  { exact: false, path: "/messages", component: Messages },
  { exact: false, path: "/add", component: Add },
  { exact: false, path: "/search", component: Search },
  { exact: false, path: "/product", component: Product },
  {
    exact: true,
    path: "/settings",
    component: Settings,
    routes: [
      { exact: true, path: "/settings", component: SettingsList },
      { exact: true, path: "/settings/edit-profile", component: EditProfile },
      {
        exact: true,
        path: "/settings/change-password",
        component: ChangePassword
      }
    ]
  }
]

// ("/username/product/edit")

export default routes
