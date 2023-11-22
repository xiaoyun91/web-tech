import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './index.scss'

export default function Index() {
  const navigate  = useNavigate();
  //第一个是值，第二个方法
  const [List, setList] = useState(['Home','List','About'])
  const [current,setCurrent] = useState(0)
 
  const changeCurrent = (idx)=>{
     setCurrent(idx)
     navigate(`/${List[idx].toLowerCase()}`)
  }
  return (
    <section className='navbar'>
        <ul className="nav">
          {
            List.map((item,idx)=>
              <li key={idx} className={current === idx?'active':''} 
              onClick={()=>changeCurrent(idx)}>{item}</li>
            )
          }
        </ul>
    </section>
  )
}
