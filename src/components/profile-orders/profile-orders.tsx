import React, {FC} from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/app-hooks";
import TapeItem from "../tape-item/tape-item";
import ordersStyles from './profile-orders.module.css';
import { TOrderData } from "../../utils/types/ws-types";
import { privateOrdersStart, privateOrdersStop } from "../../services/slices/orders-slice";

const ProfileOrders:FC = () => {
  const ordersData = useAppSelector(store => store.orders.private.orders)
  const [filteredData, setFilteredData] = useState<TOrderData[]>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(privateOrdersStart())
    return () => {
      dispatch(privateOrdersStop())
    }
  }, [dispatch])

  useEffect(() => {
    if(ordersData) {
      const newData:TOrderData[] = JSON.parse(JSON.stringify(ordersData)).reverse()
      setFilteredData(newData)
    }
  }, [ordersData])

  return (
    <section>
      <ul className={`${ordersStyles.wrapper} list-default my-scroll`}>
        {filteredData && filteredData.map(order => (
          <li key={order._id}>
             <TapeItem data={order}/>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProfileOrders