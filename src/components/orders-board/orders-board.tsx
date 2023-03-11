import React from "react";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../utils/hooks/app-hooks";
import BoardGridItem from "../board-grid/board-grid";
import BoardFigures from "../board-figures/board-figures";
import boardStyles from './orders-board.module.css';
import { filterByStatus } from "../../utils/helpers";

const OrdersBoard = () => {
  const {total, totalToday, orders} = useAppSelector(store => store.orders.public)
  const [doneOrders, setDoneOrders] = useState<number[]>()
  const [pendingOrders, setPendingOrders] = useState<number[]>()

  useEffect(() => {
    if(orders) {
      setDoneOrders(filterByStatus(orders, 'done'))
      setPendingOrders(filterByStatus(orders, 'pending'))
    }
  }, [orders])

  return (
    <section className={`${boardStyles.wrapper} ml-5 pt-15`}>
      <ul className={`${boardStyles.grid_wrapper} list-default`}>
        <li>
          <BoardGridItem title='Готовы' data={doneOrders} color={'#00CCCC'} />
        </li>
        <li>
          <BoardGridItem title='В работе' data={pendingOrders} />
        </li>
      </ul>
     <BoardFigures title="Выполнено за все время" figure={total} /> 
     <BoardFigures title="Выполнено за сегодня" figure={totalToday} /> 
    </section>
  )
}

export default OrdersBoard