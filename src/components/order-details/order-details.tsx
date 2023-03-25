import React, { FC } from "react";
import orderStyles from './order-details.module.css';
import doneImg from '../../images/done.png'
import { useAppSelector } from "../../utils/hooks/app-hooks";

const OrderDetails: FC = () => {
  const number = useAppSelector(store => store.order.order?.number)
  return (
    <div className={orderStyles.wrapper}>
      <h2 data-testid='order-number' className="text text_type_digits-large mb-8">{number}</h2>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img src={doneImg} alt="готово" className="mt-15 mb-15" />
      <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails