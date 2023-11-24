import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';

const Navbar = ({ activePage, onNavigate }) => {
  const navigate = useNavigate();
  const [list, setList] = useState(['Home', 'List', 'About']);
  const [current, setCurrent] = useState(0);

 
  useEffect(() => {
    const currentIndex = list.findIndex((item) => item.toLowerCase() === activePage.substring(1));
    if (currentIndex !== -1) {
      setCurrent(currentIndex);
    }
  }, [activePage, list]);

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
    <section className='navbar'>
      <ul className='nav'>
        {list.map((item, idx) => (
          <li key={idx} className={current === idx ? 'active' : ''} onClick={() => changeCurrent(idx)}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Navbar;

