import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients-slice';
import orderReducer from './slices/order-slice';
import ingredientReducer from './slices/ingredient-details-slice';
import constructorReducer from './slices/constructor-slice';
import userReducer from './slices/user-slice'
import passwordReducer from './slices/password-slice'
import { ordersReducer } from './slices/orders-slice';
import { wsMiddleware } from './websocket';
import { TwsActions } from '../utils/types/ws-types';
import { BASE_WS_URL } from '../utils/api';
import { getCookie } from '../utils/cookie';
import {
  requestPrivateOrders,
  discardPrivateOrders,
  openPrivateOrders,
  closePrivateOrders,
  privateOrdersOnError,
  privateOrdersOnMessage
} from './slices/ws-private-orders-sub-slice';

import {
  requestPublicOrders,
  discardPublicOrders,
  openPublicOrders,
  closePublicOrders,
  publicOrdersOnError,
  publicOrdersOnMessage
} from './slices/ws-public-orders-sub-slice';

import { PRIVATE_ORDERS_START, PRIVATE_ORDERS_STOP, PUBLIC_ORDERS_START, PUBLIC_ORDERS_STOP, PRIVATE, PUBLIC} from './slices/orders-slice';

const privateOrdersURL = `${BASE_WS_URL}?token=${getCookie("access")}`
const publicOrdersURL = `${BASE_WS_URL}/all`

const privateOrdersActions: TwsActions = {
  wsStart: PRIVATE_ORDERS_START,
  wsStop: PRIVATE_ORDERS_STOP,
  connectRequest: requestPrivateOrders,
  disconnectRequest: discardPrivateOrders,
  onOpen: openPrivateOrders,
  onClose: closePrivateOrders,
  onError: privateOrdersOnError,
  onMessage: privateOrdersOnMessage
}
const publicOrdersActions: TwsActions = {
  wsStart: PUBLIC_ORDERS_START,
  wsStop: PUBLIC_ORDERS_STOP,
  connectRequest: requestPublicOrders,
  disconnectRequest: discardPublicOrders,
  onOpen: openPublicOrders,
  onClose: closePublicOrders,
  onError: publicOrdersOnError,
  onMessage: publicOrdersOnMessage
}

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    ingredient: ingredientReducer,
    order: orderReducer,
    burgerConstructor: constructorReducer,
    user: userReducer,
    password: passwordReducer,
    orders: ordersReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      wsMiddleware(privateOrdersURL, privateOrdersActions, PRIVATE),
      wsMiddleware(publicOrdersURL, publicOrdersActions, PUBLIC))
  ,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch