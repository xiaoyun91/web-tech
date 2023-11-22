import React, { useState, useEffect } from 'react';
import { get } from '../../api/api.js';
import './index.scss';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css';
import SwiperCore, { Pagination, Autoplay } from 'swiper';

import defaultImage from '../../assets/default.jpg';
import image1 from '../../assets/top10/1.jpeg';
import image2 from '../../assets/top10/2.jpeg';
import image3 from '../../assets/top10/3.jpeg';
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

const useBookList = (query) => {
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
  }, [query]);

  return list;
};

const Home = () => {
  const hlist = useBookList('history');
  const tlist = useBookList('technology');
  const slides = [image1,image2,image3]

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
      <div className='hotbook'>hot-recommend history</div>
      <BookList list={hlist} />
      <div className='hotbook'>hot-recommend technology</div>
      <BookList list={tlist} />
    </div>
  );
};

export default Home;
