import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import defaultImage from '../../assets/default.jpg';
import { get } from '../../api/api.js';
import './index.scss';
import noDataImage from '../../assets/no_data.png';
import { Pagination } from 'antd';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


//BookList
const BookList = ({ list }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  }

  const navigate = useNavigate();
  const viewDetailFun =(param)=>{
    const targetPage = '/detail'
    const state = { id: param };
    navigate(targetPage,{ state });
  }
  return(
  <div className='booklist'>
    {list.map((item) => (
      <div className='book' key={item.id}>
        <div className='book_img'>
         {item.volumeInfo.imageLinks ? (
          <img src={item.volumeInfo.imageLinks.smallThumbnail} alt={item.volumeInfo.title} />
        ) : (
          <img src={defaultImage} alt="Default" />
        )}
       </div>
      <div className='book_info'>
          <div className='book_title'>
           <span className='label'>Book Name:</span>
           <span className='name'>{item.volumeInfo.title}</span>
          </div>
        <div className='author_name'>
          <span className='label'>authors:</span>
          <span className='name'>{item.volumeInfo.authors}</span> 
        </div>
        {isExpanded && (
              <div className='additional_info'>
               <div className='subtitle'>{item.volumeInfo.subtitle}</div>
               <div className='addition'>publishedDate:  {item.volumeInfo.publishedDate}</div>
               <div className='addition'>pageCount:  {item.volumeInfo.pageCount}</div>
               <div className='addition'>price: <span>{item.saleInfo?.listPrice?.amount|| 'Unknown'}</span>
  <span>{item.saleInfo?.listPrice?.currencyCode }</span></div>
              </div>
            )}
        <span onClick={handleToggle} className='btn_show'>{isExpanded ? 'Collapse ↑' : 'Expand ↓'}</span>    
        <div className='detail' onClick={() => viewDetailFun(item.id)}>View Details</div>
      </div>
    </div>
    ))}
  </div>
  )
};

const List = ({}) => {
  //get url searchItem
  const location = useLocation();
  const state = location.state;
  const search = state ? state.searchItem : null;

  //page size and total
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  //const Apikey = 'AIzaSyBYWIT5Gs5UOZnaib1rxuC4ADQhIAlsmSE';

  //search key word
  //author
  const [authorTerm, setAuthorTerm] = useState('')
  //filed
  const [fieldTerm, setFieldTerm] = useState(search || '');
  //title
  const [titleTerm, setTitleTerm] = useState('')
  const [filteredBooks, setFilteredBooks] = useState([]);

  //handle search
  const handleSearch = () => {
    let searchTerm = ''
  if (authorTerm) {
    searchTerm += `inauthor:${encodeURIComponent(authorTerm)}`
  }

  if (titleTerm) {
    if (searchTerm) {
      searchTerm += ','
    }
    searchTerm += `intitle:${encodeURIComponent(titleTerm)}`
  }

  if (fieldTerm) {
    if (searchTerm) {
      searchTerm += ','
    }
    searchTerm += `subject:${encodeURIComponent(fieldTerm)}`
  }
  //searchTerm += `&startIndex=${encodeURIComponent((currentPage - 1) * itemsPerPage)}&maxResults=${encodeURIComponent(itemsPerPage)}&key=${encodeURIComponent(Apikey)}`
  if(searchTerm){
    //interface
    const fetchData = async () => {
      try {
        const res = await get('/volumes', { 
          q: searchTerm,
          startIndex:encodeURIComponent((currentPage - 1) * itemsPerPage),
          maxResults:'10',
        });
        if(res.data){
        setFilteredBooks(res.data.items || [])
        setTotalItems(res.data.totalItems)
      }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }else{
    setFilteredBooks([])
    setTotalItems(0);
  }
  }
  useEffect(() => {
    handleSearch();
  }, [currentPage]);
  const handlePageChange = (page) => {
    setCurrentPage(page);

  }
  
  return (
    <div className='all-list'>
      <div className='input-part'>
      <section>
        <div className='author_name'>
          <span>Author:</span>
          <input
           type="text"
           placeholder="Input Author"
           value={authorTerm}
           maxLength={50}
           onChange={(e) => {
            let inputText = e.target.value.replace(/\s/g, '').toLowerCase()
            setAuthorTerm(inputText)
          }}
          />
          </div>
          <div className='filed_name'>
          <span>Field:</span>
          <input
           type="text"
           placeholder="Input Filed"
           value={fieldTerm}
           maxLength={50}
           onChange={(e) => setFieldTerm(e.target.value.replace(/\s/g, '').toLowerCase())}
          />
          </div>
          <div className='title_name'>
          <span>Title:</span>
           <input
           type="text"
           placeholder="Input Title"
           value={titleTerm}
           maxLength={50}
           onChange={(e) => setTitleTerm(e.target.value.replace(/\s/g, '').toLowerCase())}
          />
          </div>
          <Button type="primary" icon={<SearchOutlined/>} onClick={handleSearch}>
          Search
          </Button>
          </section>
      </div>
      { filteredBooks&&filteredBooks.length>0?(
        <section>
        <BookList list={filteredBooks} />
        <Pagination
         current={currentPage}
         onChange={handlePageChange}
         total={totalItems}
         pageSize={itemsPerPage}
         showSizeChanger={false} 
         style={{textAlign:'right',paddingBottom:'30px',paddingRight:'30px' ,paddingTop:'30px'}}
        />
      </section>
      ):(
      <div className='no_data' >
        <img src={noDataImage}/>
        <div>There are no matching books~</div>
      </div>
      )
      }
    </div>
  );
};

export default List;
