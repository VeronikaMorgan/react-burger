import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit"
import {
  PRIVATE_ORDERS_START, PRIVATE_ORDERS_STOP, PUBLIC_ORDERS_START, PUBLIC_ORDERS_STOP, PRIVATE, PUBLIC
} from "../../services/slices/orders-slice";
import { PENDING, CREATED, DONE } from "../constants";

export type TOrdersData = {
  success?: boolean
  orders: TOrderData[]
  total: number
  totalToday: number
}

export type TOrderData = {
  name: string
  ingredients: string[]
  _id: string
  status: TOrderStatus
  number: number
  createdAt: string
  updatedAt: string
}

export type TOrderStatus = typeof DONE | typeof PENDING | typeof CREATED

export type TwsActions = {
  wsStart: typeof PRIVATE_ORDERS_START | typeof PUBLIC_ORDERS_START,
  wsStop: typeof PRIVATE_ORDERS_STOP | typeof PUBLIC_ORDERS_STOP,
  connectRequest: ActionCreatorWithoutPayload,
  disconnectRequest: ActionCreatorWithoutPayload,
  onOpen: ActionCreatorWithoutPayload,
  onClose: ActionCreatorWithoutPayload,
  onError: ActionCreatorWithPayload<string>,
  onMessage: ActionCreatorWithPayload<TOrdersData>,
};


export type wsTypes = typeof PUBLIC | typeof PRIVATE

export type TPayloadType = string | TOrdersData

export type TAppActions = ReturnType<ActionCreatorWithoutPayload> | ReturnType<ActionCreatorWithPayload<TPayloadType>>