import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrderData, TOrdersData } from "../../utils/types/ws-types";

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

const wsPublicOrdersSlice = createSlice({
  name: 'public',
  initialState: wsState,
  reducers: ({
    requestPublicOrders: (state) => { (state.requestedAt = +Date.now()) },
    discardPublicOrders: (state) => { (state.discardedAt = +Date.now()) },
    openPublicOrders: (state) => { (state.isWsConnected = true) },
    closePublicOrders: (state) => { (state.isWsConnected = false) },
    publicOrdersOnMessage: (state, action: PayloadAction<TOrdersData>) => ({...state, ...action.payload}),
    publicOrdersOnError: (state, action: PayloadAction<string>) => { (state.errorMessage = action.payload) },
  })
})

export const publicOrdersReducer = wsPublicOrdersSlice.reducer
export const
  { requestPublicOrders,
    discardPublicOrders,
    openPublicOrders,
    closePublicOrders,
    publicOrdersOnError,
    publicOrdersOnMessage } = wsPublicOrdersSlice.actions