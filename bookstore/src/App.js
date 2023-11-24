
import React,{ useState,useEffect }  from 'react'
import Navbar from './components/Navbar'
import {useRoutes} from 'react-router-dom'
import routes from './router'

export default function App() {
  const element = useRoutes(routes)
  const [activePage, setActivePage] = useState('/');

//renew the navbar status
  const updateNavigation = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    const handleNavigateFunction = (event) => {
      const targetPage = event.detail;
      updateNavigation(targetPage);
    };
    window.addEventListener('handleNavigate', handleNavigateFunction);
    return () => {
      window.removeEventListener('handleNavigate', handleNavigateFunction);
    };
  }, []);

  return (
    <section className='main'>
      <Navbar activePage={activePage} onNavigate={updateNavigation}></Navbar>
      {element}
    </section>
  )
}
