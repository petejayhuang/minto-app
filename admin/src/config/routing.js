import Login from '../routes/Login'

import Category from '../routes/Categories/Category'
import CategoriesList from '../routes/Categories'

import Dashboard from '../routes/Dashboard'
import Orders from '../routes/Orders'
import Products from '../routes/Products'

import Users from '../routes/Users'
import User from '../routes/Users/User'

export const routes = [
  { path: '/', component: Login, exact: true },
  { path: '/categories', component: CategoriesList, exact: true },
  { path: '/categories/:id', component: Category },
  { path: '/dashboard', component: Dashboard },
  { path: '/login', component: Login },
  { path: '/orders', component: Orders },
  { path: '/products', component: Products },
  { path: '/users', component: Users, exact: true },
  { path: '/users/:id', component: User }
]
