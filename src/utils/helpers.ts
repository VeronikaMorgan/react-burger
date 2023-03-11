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