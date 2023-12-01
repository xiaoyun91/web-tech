import React from 'react'
import { InputNumber} from 'antd';
import {PlusOutlined, MinusOutlined} from '@ant-design/icons';
import './mobilecard.scss'

const Mobilecard = (props) => {
  const iconSrc = require('../../assets/checked_icon.png') // 选中图标
  const cardInfo = props.cardData;
  const controls = {
    upIcon: <PlusOutlined />,
    downIcon: <MinusOutlined />
  }
  return (
    <div className='card_item' key={cardInfo.productId}>
      <div className="card_check" onClick={props.onCardCheck}>
        {
          cardInfo.checked ?
          <img className="select_ed" src={iconSrc} alt=""/>
          : <div className="un_select"></div>
        }
      </div>
      <div className="card_thum">
        <img
          src={cardInfo.thumbnail}
          alt=""
        />
      </div>
      <div className="card_you">
        <div className="card_title">
          <div>{cardInfo.title}</div>
        </div>
        <div className='card_you_zh flex_row'>
          <div className="card_amount">${cardInfo.amount}</div>
          <div className='card_count'>
            <InputNumber
              min={1}
              max={100}
              value={cardInfo.count}
              controls={controls}
              onChange={(e) => props.onCardChange(e)}
            />
          </div>
        </div>
        <div className="card_you_total flex_row">
          <div className="card_total">
            <div>{cardInfo.totalAmount}</div>
          </div>
          <div className="card_tax">
            tax: ${cardInfo.checked ? (Number(cardInfo.count) *  Number(cardInfo.amount) * 0.13).toFixed(2) : '0.00'}
          </div>
          <div className='card_btn' onClick={props.onCardDelete}>
            <span>Detele</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Mobilecard