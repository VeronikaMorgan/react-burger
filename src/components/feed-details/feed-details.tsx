import React, { FC } from "react";
import { useEffect, useState, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Iingredient, TLocationState } from "../../utils/types/types";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/app-hooks";
import FeedDetailsItem from "../feed-details-item/feed-details-item";
import { setOrderDetails } from "../../services/slices/order-details-sub-slice";
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { getOrderPrice, getStatus } from "../../utils/helpers";
import { prepareIngredients } from "../../utils/prepare-ingredients";
import { PUBLIC, PRIVATE } from "../../services/slices/orders-slice";
import { DONE } from "../../utils/constants";
import { wsTypes } from "../../utils/types/ws-types";
import detailsStyles from './feed-details.module.css';

type TFeedDetails = {
  type: wsTypes
}

const FeedDetails: FC<TFeedDetails> = ({type}) => {
  const [isNotModal, setNotModal] = useState<boolean>(false)
  const [price, setPrice] = useState<number>(0)
  const [preparedData, setPreparedData] = useState<Iingredient[] | null>()

  const {ingredients} = useAppSelector(store => store.ingredients)
  const orderData = useAppSelector(store => store.orders.details.currentOrder)

  const privateOrders = useAppSelector(store => store.orders.private.orders)
  const publicOrders = useAppSelector(store => store.orders.public.orders)

  const {id} = useParams<{id: string}>()

  const dispatch = useAppDispatch()
  const location = useLocation()
  const state = location?.state as TLocationState
  
  const navigate = useNavigate()
  
  useEffect(() => {
    if(!state?.background) {
      setNotModal(true)
    }
    let currentOrder
    if(type === PUBLIC) {
      currentOrder = publicOrders?.find(i => i._id === id)
    } else {
      currentOrder = privateOrders?.find(i => i._id === id)
    }

    // if(!currentOrder) {
    //   navigate('/', {replace: true})
    // }
    currentOrder && dispatch(setOrderDetails(currentOrder))
    if(orderData) {
      const sortedData = prepareIngredients(orderData?.ingredients, ingredients)
      sortedData && setPreparedData(sortedData)
    }
  }, [orderData, publicOrders, privateOrders])

  useEffect(() => {
    preparedData && setPrice(getOrderPrice(preparedData))
  }, [preparedData])

  const textColor:string = orderData?.status === DONE ? '#00CCCC' : '#F2F2F3'
  console.log(textColor)
  return (
    orderData &&
    <div className={`${detailsStyles.wrapper} ${isNotModal && 'mt-15'}`}>
      {isNotModal && <p className={`${detailsStyles.number} text text_type_digits-default`}>#{orderData?.number}</p>}
      <h2 className={`${detailsStyles.title} text text_type_main-medium mt-10 mb-3 my-scroll text-left`}>{orderData?.name}</h2>
      <p className="text text_type_main-default" style={{color: textColor}}>{getStatus(orderData.status)}</p>
      <h3 className="text text_type_main-medium mt-15 mb-6">Состав:</h3>
      <ul className={`${detailsStyles.list_wrapper} list-default my-scroll`}>
        {
          preparedData?.map((item: Iingredient) => (
            <li key={item.nanoid}>
              <FeedDetailsItem data={item}/>
            </li>
          ))
        }
      </ul>
      <div className={`${detailsStyles.footer} mt-10`}>
      <FormattedDate date={new Date(orderData.createdAt)} className='text text_type_main-default text_color_inactive'/>
        <div className={detailsStyles.price}>
          <p className="text text_type_digits-default">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default FeedDetails