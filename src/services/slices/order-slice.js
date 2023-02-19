import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseRequest, orderOptions } from "../../utils/api";
import { getCookie } from "../../utils/cookie";
import { refreshToken } from "./refresh-token-slice";

export const getOrder = createAsyncThunk('order/get', async (dataIds, thunkAPI) => {
  try {
    if(!getCookie('access')) {
      thunkAPI.dispatch(refreshToken(getOrder))
    }
    const data = await baseRequest('orders', orderOptions(dataIds))
    return data
  } catch (err) {
    return thunkAPI.rejectWithValue(`someting went wrong: ${err}`)
  }
})
const orderData = {
  order: null,
  createOrderFailed: false,
  createOrderRequest: false,
  errorMessage: ''
}

export const orderSlice = createSlice({
  name: 'order',
  initialState: orderData,
  reducers: {
    clearOrder: (state) => ({
      ...state,
      createOrderRequest: false,
      createOrderFailed: false,
      order:null,
      errorMessage:''
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getOrder.pending, state => ({ ...state, createOrderRequest: true }))
    builder.addCase(getOrder.fulfilled, (state, action) => ({
      ...state,
      createOrderRequest: false,
      createOrderFaile: false,
      order: {
        name: action.payload.name,
        number: action.payload.order.number
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