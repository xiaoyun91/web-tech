import React, { useState ,useEffect} from 'react';
import { InputNumber } from 'antd';
import {PlusOutlined, MinusOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import './index.scss';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import defaultImage from '../../assets/default.jpg';

const detaiInfo = {
  "kind": "books#volume",
  "id": "84wbDAAAQBAJ",
  "etag": "Y8BQM6AhwWg",
  "selfLink": "https://www.googleapis.com/books/v1/volumes/84wbDAAAQBAJ",
  "volumeInfo": {
    "title": "The History Book",
    "subtitle": "Big Ideas Simply Explained",
    "authors": [
      "DK","222"
    ],
    "publisher": "Penguin",
    "publishedDate": "2016-09-16",
    "description": "Travel thousands of years into our past and discover the significant events that shaped the world as we know it. This book includes short, descriptive explanations of key ideas, themes, and events of world history that are easy to understand. Explore topics such as the founding of Baghdad, the colonization of the Americas, and the inception of Buddhism without complicated jargon. This book is part of DK's award-winning Big Ideas Simply Explained educational series that uses witty graphics and engaging descriptions to enlighten readers. Don't stop at American history, explore the world! This book is full of fun facts from the human story, going as far back as the origins of our species to space exploration today. Discover all things revolution, from the French to the digital, including the rise of the internet. Enjoy short and sweet biographies of some of the most important thinkers and leaders throughout history, like Martin Luther, Charles Darwin, and Nelson Mandela. You'll learn who said famous historical quotes, and what they really meant when they said it. Big Ideas This is a modern twist on the good old-fashioned encyclopedia, now easier to follow with diagrams, mind maps, and timelines. Step-by-step diagrams will have you reviewing your ideas about history. Start from the very beginning: - Human Origins 200,000 years ago - 3500 BGE - Ancient Civilizations 6000 BGE - 500 CE - The Medieval World 500 - 1492 - Early Modern Era 1420 - 1795 - Changing Societies 1776 - 1914 - The Modern World 1914 - Present The Series Simply Explained With over 7 million copies sold worldwide to date, The History Book is part of the award-winning Big Ideas Simply Explained series from DK Books. It uses innovative graphics along with engaging writing to make complex subjects easier to understand.",
    "industryIdentifiers": [
      {
        "type": "ISBN_13",
        "identifier": "9781465457752"
      },
      {
        "type": "ISBN_10",
        "identifier": "1465457755"
      }
    ],
    "readingModes": {
      "text": true,
      "image": true
    },
    "pageCount": 352,
    "printType": "BOOK",
    "categories": [
      "History"
    ],
    "averageRating": 1,
    "ratingsCount": 1,
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": true,
    "contentVersion": "1.8.8.0.preview.3",
    "panelizationSummary": {
      "containsEpubBubbles": false,
      "containsImageBubbles": false
    },
    "imageLinks": {
      "smallThumbnail": "http://books.google.com/books/content?id=84wbDAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      "thumbnail": "http://books.google.com/books/content?id=84wbDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.ca/books?id=84wbDAAAQBAJ&printsec=frontcover&dq=history&hl=&cd=1&source=gbs_api",
    "infoLink": "https://play.google.com/store/books/details?id=84wbDAAAQBAJ&source=gbs_api",
    "canonicalVolumeLink": "https://play.google.com/store/books/details?id=84wbDAAAQBAJ"
  },
  "saleInfo": {
    "country": "CA",
    "saleability": "FOR_SALE",
    "isEbook": true,
    "listPrice": {
      "amount": 11.99,
      "currencyCode": "CAD"
    },
    "retailPrice": {
      "amount": 11.99,
      "currencyCode": "CAD"
    },
    "buyLink": "https://play.google.com/store/books/details?id=84wbDAAAQBAJ&rdid=book-84wbDAAAQBAJ&rdot=1&source=gbs_api",
    "offers": [
      {
        "finskyOfferType": 1,
        "listPrice": {
          "amountInMicros": 11990000,
          "currencyCode": "CAD"
        },
        "retailPrice": {
          "amountInMicros": 11990000,
          "currencyCode": "CAD"
        },
        "giftable": true
      }
    ]
  },
  "accessInfo": {
    "country": "CA",
    "viewability": "PARTIAL",
    "embeddable": true,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED",
    "epub": {
      "isAvailable": true,
      "acsTokenLink": "http://books.google.ca/books/download/The_History_Book-sample-epub.acsm?id=84wbDAAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
    },
    "pdf": {
      "isAvailable": true,
      "acsTokenLink": "http://books.google.ca/books/download/The_History_Book-sample-pdf.acsm?id=84wbDAAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
    },
    "webReaderLink": "http://play.google.com/books/reader?id=84wbDAAAQBAJ&hl=&source=gbs_api",
    "accessViewStatus": "SAMPLE",
    "quoteSharingAllowed": false
  },
  "searchInfo": {
    "textSnippet": "This book is part of DK&#39;s award-winning Big Ideas Simply Explained educational series that uses witty graphics and engaging descriptions to enlighten readers. Don&#39;t stop at American history, explore the world!"
  }
}

const {volumeInfo,saleInfo} = detaiInfo
// 购物车数量
let numValue = 1;


const InputCart  = () => {
  let [value, setValue] = useState("1");
  const controls = {
    upIcon: <PlusOutlined />,
    downIcon: <MinusOutlined />
  }
  numValue = value
  return <InputNumber 
            min={1} 
            max={20} 
            defaultValue={1} 
            value={value} 
            onChange={setValue}
            controls={controls}
          /> 
};

const clickCart = ()=>{
  // 跳转购物车
  console.log(numValue,'商品数量')
}
const Detail = ({}) => {
  return (
    <div className='book_detail'>
      <div className='top_wrapper'>
        <div className='left'>
          {/* <img src={volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : defaultImage} alt={volumeInfo.title}></img> */}
          <img src={defaultImage} alt={volumeInfo.title}></img>
        </div>
        <div className='right'>
          <div className='title_wrapper'>
            <span className='main_title'>{volumeInfo.title}:</span>
            <span className='sub_title'>{volumeInfo.subtitle}</span>
          </div>
          <div className='desc'>
            <div title={volumeInfo.description}>{volumeInfo.description}</div>
          </div>
          <div className='author'>
            Authors:&nbsp;
            {volumeInfo.authors.map((item,index)=>{
              return <span key={index}>{item}</span>
            })}
          </div>
          <div className='publisher'>
            <span>Publisher: {volumeInfo.publisher}. </span>
            <span>Publication Date: {volumeInfo.publishedDate}</span>
            {volumeInfo.pageCount && <span>{'Page: ' + volumeInfo.pageCount}</span>}
          </div>
          <div className='price_wrapper'>
            <span>Price</span>
            <div className='price'>
              <span>{saleInfo.listPrice.currencyCode} </span>
              <span>{saleInfo.listPrice.amount}</span>
            </div>
          </div>

          <div className='cart_wrapper'>
            <div className='cart_input'>
              {InputCart()}
            </div>
            <div className='add_cart' onClick={clickCart}>
              <ShoppingCartOutlined />
              <span className='text'>Add To Cart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;