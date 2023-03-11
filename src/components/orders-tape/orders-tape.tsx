import React, { FC } from "react";
import { useAppSelector } from "../../utils/hooks/app-hooks";
import tapeStyles from './orders-tape.module.css'
import TapeItem from "../tape-item/tape-item";
import { TOrderData } from "../../utils/types/ws-types";

const OrdersTape:FC = () => {
  const ordersData = useAppSelector(store => store.orders.public.orders)
  return (
    <section>
      <h1 className={`${tapeStyles.title} text text_type_main-large`}>Лента заказов</h1>
      <ul className={`${tapeStyles.wrapper} my-scroll list-default`}>
        {ordersData?.map(order => (
          <li key={order._id}>
            <TapeItem data={order}/>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default OrdersTape