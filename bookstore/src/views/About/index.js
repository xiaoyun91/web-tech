import React from 'react'
import image8 from '../../assets/top10/8.jpeg';
import './index.scss'

export default function About() {
  return (
    <div className='about'>
      <img src={image8} alt=''/>
      <div className='text'> About Us</div>
      <div className='about-text'>
      <p>By integrating interfaces from the Google Books API family,
      we provide you with a variety of convenient book-related services and easy-to-understand pages.
      On the home page, you can browse images of the world's top 10 libraries and get recommendations for books in popular areas.
      On the list page, you can search for books you are interested in by any combination of author,
      field and title. 
      </p>
      <p>
      If you are interested in a certain book,
      we provide a detailed detail page for you to see more details.
      In addition, you can add books to your shopping cart and purchase them.
      Please note that in order to purchase a book,
      you will need to log in and complete the registration process, 
      then verify your authorization information. 
      We look forward to your exciting experience!</p>
      </div>
      <div className='right-info'> ©Copyright 2023/11-2023/12 xhuan427. All Rights Reserved</div>
    </div>
  )
}
