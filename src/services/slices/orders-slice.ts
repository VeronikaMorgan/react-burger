import { createAction, combineReducers } from "@reduxjs/toolkit";
import { ActionCreator } from "redux";

import { privateOrdersReducer } from "./ws-private-orders-sub-slice";
import { publicOrdersReducer } from "./ws-public-orders-sub-slice";
import { orderDetailsReducer } from "./order-details-sub-slice";

export const PRIVATE: 'private' = 'private'
export const PUBLIC: 'public' = 'public'

export const PRIVATE_ORDERS_START = 'PRIVATE_ORDERS_START' as const;
export const PRIVATE_ORDERS_STOP = 'PRIVATE_ORDERS_STOP' as const;
export const PUBLIC_ORDERS_START = 'PUBLIC_ORDERS_START' as const;
export const PUBLIC_ORDERS_STOP = 'PUBLIC_ORDERS_STOP' as const;

export const privateOrdersStart = createAction(PRIVATE_ORDERS_START)
export const privateOrdersStop = createAction(PRIVATE_ORDERS_STOP)
export const publicOrdersStart = createAction(PUBLIC_ORDERS_START)
export const publicOrdersStop = createAction(PUBLIC_ORDERS_STOP)

export const ordersReducer = combineReducers({
  private: privateOrdersReducer,
  public: publicOrdersReducer,
  details: orderDetailsReducer
})