import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrdersData, TOrderData } from "../../utils/types/ws-types";

type TwsState = {
  isWsConnected: boolean
  orders: TOrderData[] | null,
  total: number
  totalToday: number,
  requestedAt: number,
  discardedAt: number,
  errorMessage: string
}
const wsState: TwsState = {
  isWsConnected: false,
  orders: null,
  total: 0,
  totalToday: 0,
  requestedAt: 0,
  discardedAt: 0,
  errorMessage: ''
}

const wsPrivateOrdersSlice = createSlice({
  name: 'public',
  initialState: wsState,
  reducers: ({
    requestPrivateOrders: (state) => { (state.requestedAt = +Date.now()) },
    discardPrivateOrders: (state) => { (state.discardedAt = +Date.now()) },
    openPrivateOrders: (state) => { (state.isWsConnected = true) },
    closePrivateOrders: (state) => { (state.isWsConnected = false) },
    privateOrdersOnMessage: (state, action: PayloadAction<TOrdersData>) => ({...state, ...action.payload}),
    privateOrdersOnError: (state, action: PayloadAction<string>) => { (state.errorMessage = action.payload) },
  })
})

export const privateOrdersReducer = wsPrivateOrdersSlice.reducer
export const
  { requestPrivateOrders,
    discardPrivateOrders,
    openPrivateOrders,
    closePrivateOrders,
    privateOrdersOnError,
    privateOrdersOnMessage
  } = wsPrivateOrdersSlice.actions