import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.scss';
import book_icon from '../../assets/book.png';
import cart from '../../assets/cart.png'
import { List, Modal} from 'antd';
import { localGet, localPost } from '../../api/api.js';

const Navbar = ({ onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status,setStatus] = useState('Login')
  
  const [list, setList] = useState(['Home', 'List', 'About','Detail','Booklist']);
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
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    //rigister
    const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
    //log out
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
    const showLoginModal = () => {
      let userInfo = {}
      userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if(userInfo&&userInfo.name){
        setIsLogoutModalVisible(true)
      }else{
        setIsLoginModalVisible(true);
      }
    }
    const showRegisterModal = () => {
      setIsRegisterModalVisible(true);
     }

    const Login =({}) =>{
      const [email, setEmail] = useState('');
      const [error2, setError2] = useState('');
      const [password, setPassword] = useState('')
      const [error3, setError3] = useState('');
       let e2 =false, e3 = false
      const handleOk = () => {
        //Validate user input
        if(email.length == 0){
          e2 = false
          setError2('Email cannot be empty.');
        }else{
          let pattern = /^[a-zA-Z0-9\.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
          if(!pattern.test(email)){
            e2 = false
            setError2('Email format is incorrect');
          }else{
            e2 = true
            setError2('')
          }
        }
        if(password.length == 0){
          e3 = false
          setError3('Password cannot be empty.');
        }else{
          e3 = true
          setError3('')
        }
        if (e2 && e3) {
          // Make API call using Axios
          localPost('api/users/login', {
              email: email,
              password: encodeURIComponent(password),
            })
            .then(response => {
              //console.log('Response:', response.data);
              if(response.data&&response.data.name){
                localStorage.setItem('userInfo',JSON.stringify(response.data))
                if(response.data.isAdmin){
                  setList(List => [...List, 'Manage users']);
                }
                setStatus('Logout');
                setIsLoginModalVisible(false);
              }
            })
            .catch(error => {
              // Handle error
              console.log('Error:', error);
            });
        } 
      };
      const handleCancel = () => {
        setIsLoginModalVisible(false);
      };
      const handleRegister =()=>{
        setIsLoginModalVisible(false);
        setIsRegisterModalVisible(true);
      }
      return(
      <div className='login'>
       <Modal open={isLoginModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <div className='title'>Login</div>
            <div className="top">
               New? <span onClick={handleRegister}>Create an account</span>
            </div>
            <div className='input-part'>
                <div>
               <label>EMAIL</label>
               <input
                type="text"
                placeholder="Please input your email!"
                value={email}
                maxLength={30}
                onChange={(e) => setEmail(e.target.value.replace(/\s/g, ''))}
                />
                <div>{error2 && <span style={{ color: 'red' }}>{error2}</span>}</div>
                </div>
                <div>
               <label>PASSWORD</label>
               <input
                type="password"
                placeholder="Please input your password!"
                value={password}
                maxLength={10}
                onChange={(e) => setPassword(e.target.value.replace(/\s/g, ''))}
                />
                <div>{error3 && <span style={{ color: 'red' }}>{error3}</span>}</div>
               </div>
            </div>
            <div className='verify'>Not certified? Go to authentication</div>
      </Modal>
    
      </div>)
    }
    const Register = ({}) =>{
        const [name, setName] = useState('')
        const [error1, setError1] = useState('');
        const [email, setEmail] = useState('');
        const [error2, setError2] = useState('');
        const [password, setPassword] = useState('')
        const [error3, setError3] = useState('');
        const [password2, setPassword2] = useState('')
        const [error4, setError4] = useState('');
        let e1 = false,e2 = false,e3 = false,e4=false
        const handleOk = () => {
          //Validate user input
          if(name.length == 0){
            setError1('Username cannot be empty.');
            e1 = false
          }else{
            setError1('')
            e1 = true
          }
          if(email.length == 0){
            setError2('Email cannot be empty.');
            e2 = false
          }else{
            let pattern = /^[a-zA-Z0-9\.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
            if(!pattern.test(email)){
              setError2('Email format is incorrect.');
              e2 = false
            }else{
              setError2('')
              e2 = true
            }
          }
          if(password.length == 0){
            setError3('Password cannot be empty.');
            e3 = false
          }else if(password.length<6){
            setError3('Password should be at least 6 characters long.');
            e3 = false
          }else{
            setError3('')
            e3 = true
          }
          
          if(password.length == 0){
            setError4('Password cannot be empty.');
            e4 = false
          }else if(password !=password2){
              setError4('Passwords do not match. Please try again.');
            e4 = false
          }else if(password.length<6){
            setError3('Password should be at least 6 characters long.');
          }else{
              setError4('')
              e4 = true
          }
          if(e1 && e2 && e3 && e4){
            //Api
            const fetchData = async () => {
              try {
                const res = await localPost('/api/users/register', { 
                  name:name,
                  email:email,
                  password:password
                });
                 if(res.data && res.data.name){
                  localStorage.setItem('userInfo',JSON.stringify(res.data))
                  setStatus('Logout');
                  setIsRegisterModalVisible(false);
                 }
              } catch (error) {
                console.log(error);
              }
            };
            fetchData();
          }
        };
        const handleCancel = () => {
          setIsRegisterModalVisible(false);
        };
        return(
        <div className='login'>
         <Modal open={isRegisterModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <div className='title'>Register</div>
              <div className='input-part'>
                <div>
                 <label>User Name</label>
                 <input
                  type="text"
                  placeholder="Please input your username!"
                  value={name}
                  maxLength={20}
                  onChange={(e) => setName(e.target.value)}
                  />
                  <div>{error1 && <span style={{ color: 'red' }}>{error1}</span>}</div>
                  </div>
                  <div>
                 <label>EMAIL</label>
                 <input
                  type="text"
                  placeholder="Please input your email!"
                  value={email}
                  maxLength={30}
                  onChange={(e) => setEmail(e.target.value.replace(/\s/g, ''))}
                  />
                  <div>{error2 && <span style={{ color: 'red' }}>{error2}</span>}</div>
                  </div>
                  <div>
                 <label>PASSWORD</label>
                 <input
                  type="password"
                  placeholder="Please input your password!"
                  value={password}
                  maxLength={10}
                  onChange={(e) => setPassword(e.target.value.replace(/\s/g, ''))}
                  />
                  <div>{error3 && <span style={{ color: 'red' }}>{error3}</span>}</div>
                 </div>
                 <div>
                 <label>REPEAT YOUR PASSWORD</label>
                 <input
                  type="password"
                  placeholder="Please input your password again!"
                  value={password2}
                  maxLength={10}
                  onChange={(e) => setPassword2(e.target.value.replace(/\s/g, ''))}
                  />
                  <div>{error4 && <span style={{ color: 'red' }}>{error4}</span>}</div>
                 </div>
              </div>
        </Modal>
      
        </div>)
      
    }
    const Logout =({})=>{
      const handleOk = () =>{
        //清除缓存，关闭弹窗，显示登录
        localStorage.removeItem('userInfo')
        setIsLogoutModalVisible(false);
        setStatus('Login')
        const newList = list.filter(item => item !== 'Manage users')
        console.log(newList)
        setList(newList)
      }
      const handleCancel = () => {
        setIsLogoutModalVisible(false);
      };
      return (
        <div className='logout'>
        <Modal open={isLogoutModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className='log-out'>Are you sure to log out?</div>
        </Modal>
       </div>
      )

    }
    const goToCart =({})=>{
      const targetPage = '/shopcar'
      navigate(targetPage);
    }
  return (
    <section>
      <Logout visible={isLogoutModalVisible} />
    <Login visible={isLoginModalVisible} />
    <Register visible={isRegisterModalVisible}/>
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
       <span onClick={showLoginModal} >{status}</span>
       <span onClick={goToCart}><img src={cart} /></span>
      </div>
    </div>
    </section>
  );
};

export default Navbar;
