import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.scss';
import book_icon from '../../assets/book.png';
import cart from '../../assets/cart.png'
import { Modal, Button, Form, Input } from 'antd';



const Login =({visible}) =>{
  const [isModalOpen, setIsModalOpen] = useState(visible);
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return(
  <div className='login'>
   <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      
    </Modal>

  </div>)
}

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
    //login
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(true);
    const showLoginModal = () => {
     setIsLoginModalVisible(true);
    }

  
  return (
    <section>
    <Login visible={isLoginModalVisible} />
    <div className='navbar'>
      <div className='book_icon'>
        <div className='icon'>
         <img src={book_icon}/>
         <span>your bookstore</span>
        </div>
       <ul className='nav'>
        {list.map((item, idx) => (
          <li key={idx} className={current === idx ? 'active' : ''} onClick={() => changeCurrent(idx)}>
            {item}
          </li>
        ))}
       </ul>
      </div>
      <div className='right-part'> 
       <span onClick={showLoginModal}>Login</span>
       <span><img src={cart} /></span>
      </div>
    </div>
    </section>
  );
};

export default Navbar;
