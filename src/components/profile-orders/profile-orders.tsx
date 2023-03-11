import React, {FC} from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/app-hooks";
import TapeItem from "../tape-item/tape-item";
import ordersStyles from './profile-orders.module.css'
import { privateOrdersStart, privateOrdersStop } from "../../services/slices/orders-slice";

const ProfileOrders:FC = () => {
  const ordersData = useAppSelector(store => store.orders.private.orders)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(privateOrdersStart())
    return () => {
      dispatch(privateOrdersStop())
    }
  }, [dispatch])
  
  return (
    <section>
      <ul className={`${ordersStyles.wrapper} list-default my-scroll`}>
        {ordersData && ordersData.map(order => (
          <li key={order._id}>
             <TapeItem data={order}/>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProfileOrders