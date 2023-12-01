import React, { useEffect, useState } from 'react'
import { InputNumber, Modal, message } from 'antd';
import {PlusOutlined, MinusOutlined} from '@ant-design/icons';
import './index.scss'
import Mobilecard from './Mobilecard'

export default function Shopcar() {
  const [shopData, setShopData] = useState([])
  const [isAllChaeck, setIsAllChaeck] = useState(false)
  const [payAmount, setPayAmount] = useState(0)
  const [checkedItems, setCheckedItem] = useState(0)
  const [isVisibleForm, setVisibleForm] = useState(false); // 提交的二次确认弹框
  const [isMobile, setIsMobile] = useState(false)
  // 获取缓存购物车数据
  const getShopData = () => {
    const cartStr = localStorage.getItem('shopCartList')
    let cartList = []
    if(cartStr){
      cartList = JSON.parse(cartStr)
    }
    const tempList = cartList.map((item) => {
      const tempAmount = (Number(item.count) * Number(item.amount)).toFixed(2)
      return {
        ...item,
        totalAmount: tempAmount,
        tax: (Number(tempAmount) * 0.13).toFixed(2)
      }
    })
    setShopData(tempList)
    const tempCecked = tempList.filter((item1) => {
      return item1.checked
    })
    const tempAmount = tempCecked.reduce((sum, product) => sum + (Number(product.amount) * Number(product.count)), 0).toFixed(2)
    setPayAmount(tempAmount) // 计算总价
    setCheckedItem(tempCecked.length) // 计算选中的商品数量
    const isMobileDevice = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    if (isMobileDevice()) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
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
    localStorage.setItem('shopCartList', JSON.stringify(shopData))
    const tempAmount = tempCecked.reduce((sum, product) => sum + (Number(product.amount) * Number(product.count)), 0).toFixed(2)
    setPayAmount(tempAmount) // 计算总价
    setShopData(JSON.parse(JSON.stringify(shopData))) // 重新赋值列表
    setCheckedItem(tempCecked.length) // 计算选中的商品数量
  }
  const toCheck = () => {
    const selectedList = shopData.filter((item) => {
      return item.checked
    })
    if (selectedList.length === 0) {
      message.open({
        type: 'error',
        content: 'Please select at least one item',
      });
      return
    }
    setVisibleForm(true)
  }
  useEffect(() => {
    getShopData()
  }, [])
  
  const controls = {
    upIcon: <PlusOutlined />,
    downIcon: <MinusOutlined />
  }
  const Secondconfirm = (props) => {
    const [fullname, setName] = useState('');
    const [adress, setAdress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phone, setPhone] = useState('');
    const [bankAccount, setAccount] = useState('');
    const [verCode, setVerCOde] = useState('')

    const [errName, serErrName] = useState('');
    const [erradress, setErrAdress] = useState('');
    const [errZipCode, setErrZipCode] = useState('');
    const [errPhone, setErrPhone] = useState('');
    const [errAccount, setErrAccount] = useState('');
    const [errVerCode, setErrVerCode] = useState('');


    
    const handleOk = () => {
      setVisibleForm(false)
    };
    const handleCancel = () => {
      setVisibleForm(false)
    };
    const getCode = () => {
      // 获取code
      // to do todo
    }
    const clickSubmit = () => {
      if (fullname.length === 0) {
        serErrName('Fullname cannot be empty.')
      } else {
        serErrName('')
      }
      if (adress.length === 0) {
        setErrAdress('Treet Address cannot be empty.')
      } else {
        setErrAdress('')
      }
      if (zipCode.length === 0) {
        setErrZipCode('Zip code cannot be empty.')
      } else {
        setErrZipCode('')
      }
      if (phone.length === 0) {
        setErrPhone('Phone number cannot be empty.')
      } else {
        setErrPhone('')
      }
      if (bankAccount.length === 0) {
        setErrAccount('Bank account cannot be empty.')
      } else {
        setErrAccount('')
      }
      if (verCode.length === 0) {
        setErrVerCode('Verification Code cannot be empty.')
      } else {
        setErrVerCode('')
      }
      if (
        !fullname.length ||
        !adress.length ||
        !zipCode.length ||
        !phone.length ||
        !bankAccount.length ||
        !verCode.length
      ) {
        return
      } else {
        // 基本信息
        let para = {
          fullname,
          adress,
          zipCode,
          phone,
          bankAccount,
          verCode
        }
        // 选中的商品信息
        const selectedList = shopData.filter((item) => {
          return item.checked
        })
        let pra1 = {
          shopData: selectedList
        }
        console.log(para, pra1)
        // to do todo
      }
    }
    return (
      <div className="second_confirm_box">
        <Modal
          open={props.visible}
          onOk={handleOk}
          onCancel={handleCancel}
          getContainer={() => document.getElementById('shopContainerForm')}
          footer={null}
          maskClosable={false}
        >
          <div className="form_item">
            <div className="label">Full name (First and Last name)</div>
            <input
              type="text"
              placeholder="Please input your name"
              value={fullname}
              onChange={(e) => setName(e.target.value.trim())}
            />
            <div className="error_tip">{errName ? errName : ''}</div>
          </div>
          <div className="form_item">
            <div className="label">treet address</div>
            <input
              type="text"
              placeholder="Please input your treet address"
              value={adress}
              onChange={(e) => setAdress(e.target.value.trim())}
            />
            <div className="error_tip">{erradress ? erradress : ''}</div>
          </div>
          <div className="form_item">
            <div className="label">Zip Code</div>
            <input
              type="text"
              placeholder="Please input your zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.trim())}
            />
            <div className="error_tip">{errZipCode ? errZipCode : ''}</div>
          </div>
          <div className="form_item">
            <div className="label">Phone number</div>
            <input
              type="text"
              placeholder="Please input your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.trim())}
            />
            <div className="error_tip">{errPhone ? errPhone : ''}</div>
          </div>
          <div className="form_item">
            <div className="label">Bank Account</div>
            <input
              type="text"
              placeholder="Please input your bank account"
              value={bankAccount}
              onChange={(e) => setAccount(e.target.value.trim())}
            />
            <div className="error_tip">{errAccount ? errAccount : ''}</div>
          </div>
          <div className="form_item">
            <div className="label">Get Verification Code</div>
            <div className="get_code_box">
              <input
                type="text"
                placeholder="Please input your cerification Code"
                value={verCode}
                onChange={(e) => setVerCOde(e.target.value.trim().replace(/\D/g, '').slice(0, 6))}
              />
              <div className="get_code_btn point" onClick={getCode}>
                <span>Get</span>
              </div>
            </div>
            <div className="error_tip">{errVerCode ? errVerCode : ''}</div>
          </div>
          <div className="submit_btn point" onClick={clickSubmit}>
            <span>submit</span>
          </div>
        </Modal>
      </div>
    )
  }
  return (
    <div>
      <div className="shop_car_wrap">
        <div id="shopContainerForm"></div>
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
                <span style={{marginLeft: '4px'}}>{isAllChaeck ? 'Deselect all' : 'Select All'}</span>
              </div>
              {
                isMobile ?
                <div className='head_total'>
                  <div className="zuo">
                    <div className="zuo_sh">
                      <span className="payment_sub">Subtotal:</span>
                      <span className="payment_num">${payAmount > 0 ? `${payAmount}` : '0.00'}</span>
                    </div>
                    <div className="zuo_xia">
                      <span>Tax:</span>
                      <span>${payAmount > 0 ? (Number(payAmount) * 0.13).toFixed(2) : '0.00'}</span>
                    </div>
                  </div>
                </div> :
                <div className='head_other'>
                  <div className='head_name'>Product Name</div>
                  <div className="head_price width_100">Product Price</div>
                  <div className="head_quantity width_100">Quantity</div>
                  <div className="head_total width_100">Subtotal</div>
                  <div className="head_tax width_100">Tax</div>
                  <div className="head_operate width_100">Operate</div>
                </div>
              }
            </div>
            <div className="head_check_btn" onClick={toCheck}>
              <span>Checkout</span>
              <span> {!!checkedItems ? `(${checkedItems} items)` : ''}</span>
            </div>
          </section> :
          null
        }
        {shopData && shopData.length ? shopData.map((productsItem, index) => (
          <section key={`${productsItem.id}${index}`}>
            {
              isMobile ? <Mobilecard
              centered={true}
              cardData={productsItem}
              onCardCheck={() => {checkItem(productsItem)}}
              onCardChange={(e) => {countChange(e, productsItem)}}
              onCardDelete={() => {deleteItem(index)}}
              key={productsItem.id}
            ></Mobilecard> :
            
            <div className='shop_item' key={productsItem.id}>
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
              <div className="prdt_amount width_100">${productsItem.amount}</div>
              <div className='prdt_count width_100'>
                <InputNumber
                  min={1}
                  max={100}
                  value={productsItem.count}
                  controls={controls}
                  onChange={(e) => {countChange(e, productsItem)}}
                />
              </div>
              <div className="prdt_total width_100">
                <div>{productsItem.totalAmount}</div>
              </div>
              <div className="prdt_tax width_100">
                {productsItem.checked ? (Number(productsItem.count) *  Number(productsItem.amount) * 0.13).toFixed(2) : '0.00'}
              </div>
              <div className="prdt_edit width_100">
                <div className="edit_btn" onClick={() => {deleteItem(index)}}>Remove</div>
              </div>
            </div>
            }
          </section>
        )) :
          <section className="none_box">
            <img src={noneBg} alt=""/>
            <div className='none_txt'>您的购物车还是空的</div>
          </section>
        }
        {
          !isMobile && shopData && shopData.length ?
            <section className='payment_total'>
              <div className="zuo">
                <div className="zuo_sh">
                  <span className="payment_sub">Subtotal {!!checkedItems ? `(${checkedItems} items)` : ''}:</span>
                  <span className="payment_num">${payAmount > 0 ? `${payAmount}` : '0.00'}</span>
                </div>
                <div className="zuo_xia">
                  <span>Tax:</span>
                  <span>${payAmount > 0 ? (Number(payAmount) * 0.13).toFixed(2) : '0.00'}</span>
                </div>
              </div>
              <div className="check_btn" onClick={toCheck}>
                <span>Checkout</span>
              </div>
            </section> :
            null
        }
        
      </div>
      <Secondconfirm visible={isVisibleForm} />
    </div>
  )
}
