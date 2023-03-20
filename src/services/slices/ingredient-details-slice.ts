import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Iingredient } from "../../utils/types/types";

type TIngredientDetails = {
  currentIngredient: null | Iingredient
}
const ingredientState: TIngredientDetails = {
  currentIngredient: null,
}

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState: ingredientState,
  reducers: {
    setIngredient: (state, action: PayloadAction<Iingredient>) => {state.currentIngredient = action.payload},
    clearIngredient: state => {state.currentIngredient = null}
  }
})

export const {
  setIngredient,
  clearIngredient
} = ingredientSlice.actions

export default ingredientSlice.reducer
