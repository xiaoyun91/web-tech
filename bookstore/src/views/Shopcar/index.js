import React, { useEffect, useState } from 'react'
import { InputNumber } from 'antd';
import {PlusOutlined, MinusOutlined} from '@ant-design/icons';
import './index.scss'
import { shopList } from './contant'


export default function Shopcar() {
  const [shopData, setShopData] = useState([])
  const [isAllChaeck, setIsAllChaeck] = useState(false)
  const [payAmount, setPayAmount] = useState(0)

  const getShopData = () => {
    console.log(shopList, '-=')
    const tempList = shopList.map((item) => {
      return {
        ...item,
        totalAmount: (Number(item.count) * Number(item.amount)).toFixed(2)
      }
    })
    setShopData(tempList)
  }
  
  const iconSrc = require('../../assets/checked_icon.png') // 选中图标
  const noneBg = require('../../assets/no_data.png')
  // 全选
  const checkAll = () => {
    setIsAllChaeck(!isAllChaeck)
    if (!isAllChaeck) {
      // 选中了所有
      shopData.forEach((item) => {
        item.checked = true
      })
    } else {
      // 取消了所有选中了
      shopData.forEach((item) => {
        item.checked = false
      })
    }
    commonPrice()
  }
  // 单选
  const checkItem = (productInfo) => {
    productInfo.checked = !productInfo.checked
    const tempCheckedList = shopData.filter((item1) => {
      return item1.checked
    })
    if (tempCheckedList.length === shopData.length) {
      // 全选按钮回填变选中状态
      setIsAllChaeck(true)
    } else {
      setIsAllChaeck(false)
    }
    commonPrice()
  }
  // 数量加减
  const countChange = (num, item) => {
    item.count = num
    item.totalAmount = (Number(num) * Number(item.amount)).toFixed(2)
    item.checked = true
    commonPrice()
  }
  // 删除
  const deleteItem = (i) => {
    shopData.splice(i, 1)
    commonPrice()
  }
  // 公共计算总价方法，在数量选中状态发生变化时调用
  const commonPrice = () => {
    const tempCecked = shopData.filter((item1) => {
      return item1.checked
    })
    const tempAmount = tempCecked.reduce((sum, product) => sum + (Number(product.amount) * Number(product.count)), 0).toFixed(2)
    setPayAmount(tempAmount)
    setShopData(JSON.parse(JSON.stringify(shopData)))
  }

  useEffect(() => {
    getShopData()
  }, [])
  
  const controls = {
    upIcon: <PlusOutlined />,
    downIcon: <MinusOutlined />
  }

  return (
    <div className="shop_car_wrap">
      {
        shopData && shopData.length ?
        <section className='shop_car_head'>
          <div className="head_container flex_v_c">
            <div className='all_check_box flex_v_c' onClick={() => { checkAll() }}>
              {
                isAllChaeck ?
                <img className="select_ed" src={iconSrc} alt=""/>
                :
                <div className="un_select"></div>
              }
              <span style={{marginLeft: '4px'}}>Select All</span>
            </div>
            {/* <div>Product Name</div>
            <div>Product Price</div>
            <div>Quantity</div>
            <div>Subtotal</div>
            <div>Operate</div> */}
          </div>
        </section> :
        null
      }
      {shopData && shopData.length ? shopData.map((productsItem, index) => (
        <section key={productsItem.id}>
          <div className='shop_item' key={productsItem.productId}>
            <div className="prdt_check" onClick={() => { checkItem(productsItem) }}>
              {
                productsItem.checked ?
                <img className="select_ed" src={iconSrc} alt=""/>
                : <div className="un_select"></div>
              }
            </div>
            <div className="prdt_thum">
              <img
                src={productsItem.thumbnail}
                alt=""
              />
            </div>
            <div className="prdt_title">
              <div>{productsItem.title}</div>
            </div>
            <div className="prdt_amount">${productsItem.amount}</div>
            <div className='prdt_count'>
              <InputNumber
                min={1}
                max={100}
                value={productsItem.count}
                controls={controls}
                onChange={(e) => {countChange(e, productsItem)}}
              />
            </div>
            <div className="prdt_total">
              <div>{productsItem.totalAmount}</div>
            </div>
            <div>{productsItem.itemTotalMoney}</div>
            <div className="prdt_edit">
              <div className="edit_btn" onClick={(e) => {deleteItem(index)}}>Remove</div>
            </div>
          </div>
        </section>
      )) :
        <section className="none_box">
          <img src={noneBg} alt=""/>
          <div className='none_txt'>您的购物车还是空的</div>
        </section>
      }
      {
        shopData && shopData.length ?
          <section className='payment_total'>
            <div>Subtotal:</div>
            <div></div>
            <div className="payment_num">${payAmount > 0 ? `${payAmount}` : '0.00'}</div>
          </section> :
          null
      }
      
    </div>
  )
}
