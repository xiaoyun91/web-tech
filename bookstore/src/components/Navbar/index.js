import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.scss';

const Navbar = ({ onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [list, setList] = useState(['Home', 'List', 'About','Detail']);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // get current path
    const currentRoute = location.pathname.substring(1);

    const currentIndex = list.findIndex((item) => item.toLowerCase() === currentRoute);
    if (currentIndex !== -1) {
      setCurrent(currentIndex);
    }
  }, [location.pathname, list]);

  // handle click event
  const changeCurrent = (idx) => {
    setCurrent(idx);
    const targetPage = `/${list[idx].toLowerCase()}`;

    if (typeof onNavigate === 'function') {
      onNavigate(targetPage);
    }

    navigate(targetPage);
  };

  return (
    <div className='navbar'>
      <ul className='nav'>
        {list.map((item, idx) => (
          <li key={idx} className={current === idx ? 'active' : ''} onClick={() => changeCurrent(idx)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
