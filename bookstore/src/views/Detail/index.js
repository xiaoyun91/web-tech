import React, { useState ,useEffect, useRef} from 'react';
import { InputNumber } from 'antd';
import { get } from '../../api/api.js';
import {PlusOutlined, MinusOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import './index.scss';
import 'swiper/swiper-bundle.css';
import { useParams, useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/default.jpg';


export default function Detail() {
  const params  = useParams()
  const navigate = useNavigate();
  // 购物车数量
  const [numValue, setNumValue] = useState("1");
  const myRef = useRef()
  const [volumeInfo, setVolumeInfo] = useState({});
  const [saleInfo, setSaleInfo] = useState({});
  const [imageLinks, setImageLinks] = useState([]);
  //API
  const useBookDetail = (volumeId) => {
    
    
    useEffect(() => {
      //interface  todo 放开接口
      const fetchData = async () => {
        // try {
        //   const res = await get(`/volumes/${volumeId}`);
        //   console.log('res',res.data)
          
        
          let obj = {
            "kind": "books#volume",
            "id": "WADDM36d3TAC",
            "etag": "uBY/uAj1plY",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/WADDM36d3TAC",
            "volumeInfo": {
              "title": "The Discarded Image",
              "subtitle": "An Introduction to Medieval and Renaissance Literature",
              "authors": [
                "C. S. Lewis"
              ],
              "publisher": "Cambridge University Press",
              "publishedDate": "1994-08-26",
              "description": "C.S. Lewis' The Discarded Image paints a lucid picture of the medieval world view, as historical and cultural background to the literature of the Middle Ages and Renaissance. It describes the \"image\" discarded by later ages as \"the medieval synthesis itself, the whole organization of their theology, science and history into a single, complex, harmonious mental model of the universe.\" This, Lewis' last book, was hailed as \"the final memorial to the work of a great scholar and teacher and a wise and noble mind.\"",
              "industryIdentifiers": [
                {
                  "type": "ISBN_10",
                  "identifier": "0521477352"
                },
                {
                  "type": "ISBN_13",
                  "identifier": "9780521477352"
                }
              ],
              "readingModes": {
                "text": false,
                "image": true
              },
              "pageCount": 231,
              "printedPageCount": 248,
              "dimensions": {
                "height": "22.00 cm",
                "width": "13.70 cm",
                "thickness": "1.50 cm"
              },
              "printType": "BOOK",
              "categories": [
                "History / Social History",
                "Literary Criticism / European / English, Irish, Scottish, Welsh",
                "Literary Criticism / Ancient & Classical",
                "Literary Criticism / Renaissance"
              ],
              "averageRating": 5,
              "ratingsCount": 1,
              "maturityRating": "NOT_MATURE",
              "allowAnonLogging": false,
              "contentVersion": "1.5.11.0.preview.1",
              "panelizationSummary": {
                "containsEpubBubbles": false,
                "containsImageBubbles": false
              },
              "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=WADDM36d3TAC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE70M7r6JHBQQ-Ul6-rJlZkJ60B9kyuzlujHPsecMmdZU5chTCEH8PjpfGAoXRrpT8tkRQQllNFzVy7h93vJ85Js7aIQNLl9gIzkRFLbLwRtSamXnoJGnk3GWwHu7vNgDcJDghNAn&source=gbs_api",
                "thumbnail": "https://img.zcool.cn/community/01f1c75ef9536da801215aa03429ca.png",
                "small": "http://books.google.com/books/content?id=WADDM36d3TAC&printsec=frontcover&img=1&zoom=2&edge=curl&imgtk=AFLRE71kol7fKtRWbGBPozy8PQv7mZ0V9lP1v0C1chTeI51y6En5fDvM25SzLDLtrMX_6Qxu8uXLNYVAdL9YeNNVnoz4kqE0Qr64UHLndr-jLB94HsjzzAGMW1urxWP_6jtnQAbDlEvv&source=gbs_api",
                "medium": "http://books.google.com/books/content?id=WADDM36d3TAC&printsec=frontcover&img=1&zoom=3&edge=curl&imgtk=AFLRE73gyKiZizrb9iZWZjyQ_lCBCDRlp68OIXhFUOajDV6T3ydnM1tWXq2KLyluCTBbM-3toqkde58Su6pIW-ea6mFwGskmCRwdLLxLercuN7D2_j9srZrtdiMJ4fHd_424rndmXvED&source=gbs_api",
                "large": "http://books.google.com/books/content?id=WADDM36d3TAC&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE71Kq8bSK1Dk3w16Hq2sol2lj60a8V3yddMl49aOkKJSjm8x1ZZ_c2RtqD4Xt6m8TChY1_3JEy3ITDCnoEzvwWUdNiUHB9IzIpZUQpc58UNOrxVqxqMhiVcnP7oDtatLvVtEzbPV&source=gbs_api",
                "extraLarge": "http://books.google.com/books/content?id=WADDM36d3TAC&printsec=frontcover&img=1&zoom=6&edge=curl&imgtk=AFLRE70pveGTPbkuxEQATV1mYLQKUwBp8tdKKYo99mjKAvKpDLjtyC682Qo5VDx0C0thfH7sbaPeLWHm9FZOrwWiLv2whFGYMcfWjz0HJOeVQhLelCPF7g1453o6d0mUno0meLzaVlmV&source=gbs_api"
              },
              "language": "en",
              "previewLink": "http://books.google.ca/books?id=WADDM36d3TAC&hl=&source=gbs_api",
              "infoLink": "https://play.google.com/store/books/details?id=WADDM36d3TAC&source=gbs_api",
              "canonicalVolumeLink": "https://play.google.com/store/books/details?id=WADDM36d3TAC"
            },
            "layerInfo": {
              "layers": [
                {
                  "layerId": "geo",
                  "volumeAnnotationsVersion": "15"
                }
              ]
            },
            "saleInfo": {
              "country": "CA",
              "saleability": "NOT_FOR_SALE",
              "isEbook": false,
              "listPrice": {
                "currencyCode": "CAD",
                "amount": "20",
              }
            },
            "accessInfo": {
              "country": "CA",
              "viewability": "PARTIAL",
              "embeddable": true,
              "publicDomain": false,
              "textToSpeechPermission": "ALLOWED",
              "epub": {
                "isAvailable": false
              },
              "pdf": {
                "isAvailable": true,
                "acsTokenLink": "http://books.google.ca/books/download/The_Discarded_Image-sample-pdf.acsm?id=WADDM36d3TAC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
              },
              "webReaderLink": "http://play.google.com/books/reader?id=WADDM36d3TAC&hl=&source=gbs_api",
              "accessViewStatus": "SAMPLE",
              "quoteSharingAllowed": false
            }
          }
        setVolumeInfo(obj.volumeInfo || {})
        setSaleInfo(obj.saleInfo || {})
        const imgs = obj?.volumeInfo?.imageLinks || []
        let arr = []
        let index = 0
        for(const item in imgs) {
          arr.push(imgs[item])
          index++
        }
        setImageLinks(arr)
      //   } catch (error) {
      //     console.log(error);
      //   }
      };
      fetchData();
    }, [volumeId]);
  };




  const InputCart  = () => {
    const controls = {
      upIcon: <PlusOutlined />,
      downIcon: <MinusOutlined />
    }
    return <InputNumber 
              min={1}
              max={20} 
              defaultValue={1} 
              value={numValue} 
              onChange={setNumValue}
              controls={controls}
            /> 
  };

  const clickCart = ()=>{
    // 跳转购物车
    const cartStr = localStorage.getItem('shopCartList')
    let addFlag = false
    let cartList = []
    if(cartStr){
      cartList = JSON.parse(cartStr)
      for(const item of cartList) {
        if (item.id === params.id) {
          addFlag = true
          item.amount = saleInfo?.listPrice?.amount || 'unkwon'
          item.count = Number(item.count) + Number(numValue)
        }
      }
    }
    if (!addFlag) {
      cartList.push({
        id: params.id, // 图书id
        title: volumeInfo.title, // 图书名字
        subtitle: volumeInfo.subtitle, // 图书副标题
        thumbnail: volumeInfo?.imageLinks?.thumbnail ? volumeInfo.imageLinks.thumbnail : defaultImage, // 封面链接
        currencyCode: saleInfo?.listPrice?.currencyCode || 'unkwon', // 币种
        amount: saleInfo?.listPrice?.amount || 'unkwon', // 价格
        count: Number(numValue), //数量
      })
    }
    localStorage.setItem('shopCartList',JSON.stringify(cartList))
    
    navigate('/shopcar');
  }

  useBookDetail(params.id)

  return (
    <div className='book_detail'>
      <div className='top_wrapper'>
        <div className='left'>
          <img src={volumeInfo?.imageLinks?.thumbnail ? volumeInfo.imageLinks.thumbnail : defaultImage} alt={volumeInfo.title}></img>
        </div>
        <div className='right'>
          <div className='title_wrapper'>
            <span className='main_title'>{volumeInfo.title}:</span>
            <span className='sub_title'>{volumeInfo.subtitle}</span>
          </div>
          <div className='author'>
            Authors:&nbsp;
            {volumeInfo.authors && volumeInfo.authors.map((item,index)=>{
              return <span key={index}>{item}</span>
            })}
          </div>
          <div className='publisher'>
            <div>
              <span>Publisher: </span>
              <span>{volumeInfo.publisher}</span>
            </div>
            <div>
              <span>Publication Date: </span>
              <span>{volumeInfo.publishedDate}</span>
            </div>
            { volumeInfo.pageCount && 
              <div>
                <span>Page: </span>
                <span>{volumeInfo.pageCount}</span>
              </div>
            }
          </div>
          <div className='price_content'>
            <div className='price_wrapper'>
              <span>Price</span>
              <div className='price'>
                <span>{saleInfo?.listPrice?.currencyCode || 'unkwon'} </span>
                <span>{saleInfo?.listPrice?.amount || 'unkwon'}</span>
              </div>
            </div>
            <div className='tax_wrapper'>{saleInfo?.listPrice?.currencyCode || 'unkwon'} {saleInfo?.listPrice?.amount*0.13 || 'unkwon'} Estimated taxes and fees</div>
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
      <div className='main_wrapper'>
        <div className='min_title'>Product Description</div>
        <div className='container'>
          <div className='desc'>{volumeInfo.description}</div>
          {imageLinks.map((item,index) => (
            <div className='detail_img' key={index}>
              <img src={item ? item : defaultImage} alt={item}  onError={(e) => { e.target.src = defaultImage }}></img>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
