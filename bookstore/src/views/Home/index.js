import React, { useState ,useEffect} from 'react';
import { get } from '../../api/api.js';
import './index.scss';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import { useNavigate } from 'react-router-dom';

import defaultImage from '../../assets/default.jpg';
import image1 from '../../assets/top10/1.jpeg';
import image2 from '../../assets/top10/2.jpeg';
import image3 from '../../assets/top10/3.jpeg';
import image4 from '../../assets/top10/4.png';
import image5 from '../../assets/top10/5.jpeg';
import image6 from '../../assets/top10/6.jpeg';
SwiperCore.use([Pagination, Autoplay]);

const BookList = ({ list }) => (
  <div className='booklist'>
    {list.map((item) => (
      <div className='book' key={item.id}>
         {item.volumeInfo.imageLinks ? (
          <img src={item.volumeInfo.imageLinks.smallThumbnail} alt={item.volumeInfo.title} />
        ) : (
          <img src={defaultImage} alt="Default" />
        )}
       
        <div className='booktitle'>{item.volumeInfo.title}</div>
        <div className='subtitle'>{item.volumeInfo.subtitle}</div>
        <div className='detail'>View Details</div>
      </div>
    ))}
  </div>
);

const useBookList = (query, setBookData) => {
  const [list, setList] = useState([]);
  
  useEffect(() => {
    //interface
    const fetchData = async () => {
      try {
        const res = await get('/volumes', { q: query, maxResults: 4 });
        setList(res.data.items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [query,setBookData]);

  return list;
};

const Home = ({}) => {
  const navigate = useNavigate();

  const hlist = useBookList('subject:history');
  const tlist = useBookList('subject:technology');
  const elist = useBookList('subject:education');
  const slist = useBookList('subject:science');
  const flist = useBookList('subject:food');
  
  const slides = [image1,image2,image3,image4,image5,image6]

  // handle click event
  const handleJump =()=>{

    const targetPage = '/list'
    const state = { searchItem: 'history' };
    navigate(targetPage,{ state });

  }
  //return 
  const categoryList = [
    { category: 'hot-recommend history', list: hlist },
    { category: 'hot-recommend technology', list: tlist },
    { category: 'hot-recommend education', list: elist },
    { category: 'hot-recommend science', list: slist },
    { category: 'hot-recommend food', list: flist },
  ];

  return (
    <div className='recommend'>
      <Swiper
      style={{width:'100%'}}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
    >
      {
        slides.map((item,index)=>
        <SwiperSlide key={index}>
          <img className="slide-img" src={item} alt="" />
        </SwiperSlide>)
      }
    </Swiper>
    {categoryList.map(({ category, list }, index) => (
      <section key={index}>
      <div  className="hotbook">
        <span>{category}</span>
        <span className="more" onClick={handleJump}>
          view more&nbsp;&gt;
        </span>
        </div>
        <BookList list={list} />
        </section>
    ))}
    </div>
  );
};

export default Home;
