import { Navigate } from "react-router-dom"
import Home from '../views/Home'
import About from '../views/About'
import List from "../views/List"

export default [
  {
    path:'/home',
    element:<Home/>
  },
  {
    path:'/about',
    element:<About/>
  },
  {
    path:'/list',
    element:<List/>
  },
  {
    path:'/',
    element:<Navigate to='/home'/>
  }
]
