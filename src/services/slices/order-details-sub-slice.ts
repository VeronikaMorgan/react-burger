import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrderData } from "../../utils/types/ws-types";

type TorderState = {
  currentOrder: TOrderData | null
}

export const orderState = <TorderState>{
  currentOrder: null,
}

const orderDetailsSlice = createSlice({
  name: 'details',
  initialState: orderState,
  reducers: {
    setOrderDetails: (state, action: PayloadAction<TOrderData>) => {( state.currentOrder = action.payload )},
    clearOrderDetails: state => { state.currentOrder = null }
  }
})
export const {setOrderDetails, clearOrderDetails} = orderDetailsSlice.actions
export const orderDetailsReducer = orderDetailsSlice.reducer