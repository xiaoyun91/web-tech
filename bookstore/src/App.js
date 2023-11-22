
import React from 'react'
import Navbar from './components/Navbar'
import {useRoutes} from 'react-router-dom'
import routes from './router'
export default function App() {
  const element = useRoutes(routes)
  return (
    <section className='main'>
      <Navbar></Navbar>
      {element}
    </section>
  )
}
