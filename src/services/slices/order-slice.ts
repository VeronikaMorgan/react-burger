import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  orderOptions, fetchWithRefresh } from "../../utils/api";
import { createAppAsyncThunk } from "../../utils/hooks/app-hooks";

export const getOrder = createAppAsyncThunk('order/get', async (dataIds: string[][], thunkAPI) => {
    const data = await fetchWithRefresh('orders', orderOptions(dataIds))
    return data.order
})

type TOrderState = {
  order: TOrderData | null
  createOrderFailed: boolean
  createOrderRequest: boolean
  errorMessage: string | undefined
}

type TOrderData = {
  name: string,
  number: number
}

const orderState: TOrderState = {
  order: {
    name: '',
    number: 0
  },
  createOrderFailed: false,
  createOrderRequest: false,
  errorMessage: ''
}

export const orderSlice = createSlice({
  name: 'order',
  initialState: orderState,
  reducers: {
    clearOrder: state => ({
      ...state,
      createOrderRequest: false,
      createOrderFailed: false,
      order: null,
      errorMessage:''
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getOrder.pending, state => ({ ...state, createOrderRequest: true }))
    builder.addCase(getOrder.fulfilled, (state, action: PayloadAction<TOrderData>) => ({
      ...state,
      createOrderRequest: false,
      createOrderFaile: false,
      order: {
        name: action.payload.name,
        number: action.payload.number
      }
    }))
    builder.addCase(getOrder.rejected, (state, action) => ({
      ...state,
      createOrderRequest: false,
      createOrderFailed: false,
      order: null,
      errorMessage: action.payload
    }))
  }
})

export const {
  clearOrder
} = orderSlice.actions

export default orderSlice.reducer