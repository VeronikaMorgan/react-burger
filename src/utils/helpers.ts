import { CREATED, PENDING, DONE } from "./constants";
import { Iingredient } from "./types/types";
import { TOrderData, TOrderStatus } from "./types/ws-types";

export const getOrderPrice = (data : Iingredient[]): number => {
  return Array.from(data).reduce((acc, i) => { return i.type === 'bun' ? acc + i.price * 2 : acc + i.price }, 0);
}

export const filterByStatus = (data: TOrderData[], status: TOrderStatus): number[] => {
  return data.filter(item => item.status === status).map(item => item.number)
}

export const getStatus = (status: TOrderStatus): string => {
  switch(status) {
    case CREATED: {
      return "Создан"
    }
    case PENDING: {
      return "Готовится"
    }
    case DONE: {
      return "Выполнен"
    }
    default: {
      console.log('wrong order status')
      return ''
    } 
  }
}
type Tobj = {
  [name: string]: Iingredient
}
export const filterByQwty = (data : Iingredient[]): Iingredient[] => {
  const result = data.reduce((acc, item) => {
    return (typeof acc[item._id] !== 'undefined')
    ? {...acc, [item._id]: {...acc[item._id], __v: acc[item._id].__v + 1}}
    : {...acc, [item._id]: {...item, __v: 1}}
  }, {} as Tobj)
  return Object.values(result)
}