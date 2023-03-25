import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrderData } from "../../utils/types/ws-types";

type TDetailsState = {
  currentOrder: TOrderData | null
}

const detailsState = <TDetailsState>{
  currentOrder: null,
}

const orderDetailsSlice = createSlice({
  name: 'details',
  initialState: detailsState,
  reducers: {
    setOrderDetails: (state, action: PayloadAction<TOrderData>) => {( state.currentOrder = action.payload )},
    clearOrderDetails: state => {state.currentOrder = null }
  }
})
export const {setOrderDetails, clearOrderDetails} = orderDetailsSlice.actions
export const orderDetailsReducer =  orderDetailsSlice.reducer