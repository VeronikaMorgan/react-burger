import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Iingredient } from "../../utils/types";

interface IConstructorState {
  constructorItems: Iingredient[]
  hasBun: boolean
}

const constructorState: IConstructorState = {
  constructorItems: [],
  hasBun: false,
}

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: constructorState,
  reducers: {
    addItem: (state, action) => { state.constructorItems.push(action.payload) },
    addBun: (state, action: PayloadAction<Iingredient>) => {
      if(state.hasBun) {
        state.constructorItems = state.constructorItems.map(item => item.type === 'bun' ? action.payload : item)
       } else {
        state.constructorItems.push(action.payload)
        state.hasBun = true
       }
    },
    deleteItem: (state, action: PayloadAction<Iingredient>) => {
      if(action.payload.type !== 'bun') {
        state.constructorItems = state.constructorItems.filter(item => item.uuid !== action.payload.uuid)
      }
    },
    updateConstructor: (state, action) => {state.constructorItems = action.payload},
    clearConstructor: state => {
      state.constructorItems = []
      state.hasBun = false
    }
  }
})

export const { addItem, addBun, deleteItem, updateConstructor, clearConstructor } = constructorSlice.actions
export default constructorSlice.reducer
