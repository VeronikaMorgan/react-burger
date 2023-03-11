import React, { FC } from "react";
import { useEffect } from "react";
import Columns from "../../components/columns/columns";
import OrdersTape from "../../components/orders-tape/orders-tape";
import OrdersBoard from "../../components/orders-board/orders-board";
import feedStyles from './feed-page.module.css';
import { useAppDispatch } from "../../utils/hooks/app-hooks";
import { publicOrdersStart, publicOrdersStop } from "../../services/slices/orders-slice";

const FeedPage: FC = () => {
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(publicOrdersStart())
    return () => {
      dispatch(publicOrdersStop())
    }
  }, [dispatch])
  
  return (
    <main className={feedStyles.wrapper}>
      <Columns>
        <OrdersTape />
        <OrdersBoard />
      </Columns>
    </main>
  )
}

export default FeedPage