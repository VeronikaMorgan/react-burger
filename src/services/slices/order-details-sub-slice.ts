import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrderData } from "../../utils/types/ws-types";

type TDetailsState = {
  currentOrder: TOrderData | null
  isOrderSelected: boolean
}

const detailsState = <TDetailsState>{
  currentOrder: null,
  isOrderSelected: false
}

const orderDetailsSlice = createSlice({
  name: 'details',
  initialState: detailsState,
  reducers: {
    setOrderSelected: state => {(state.isOrderSelected = true)},
    setOrderDetails: (state, action: PayloadAction<TOrderData>) => {( state.currentOrder = action.payload )},
    clearOrderDetails: state => ({...state, currentOrder: null, isOrderSelected: false })
  }
})
export const {setOrderDetails, clearOrderDetails, setOrderSelected} = orderDetailsSlice.actions
export const orderDetailsReducer =  orderDetailsSlice.reducer