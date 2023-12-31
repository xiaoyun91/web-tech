import { Navigate } from "react-router-dom"
import Home from '../views/Home'
import About from '../views/About'
import List from "../views/List"
import Detail from "../views/Detail"

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
    path:'/detail/:id',
    element:<Detail/>
  },
  {
    path:'/',
    element:<Navigate to='/home'/>
  }
]
