import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Iingredient } from "../../utils/types/types";

type TIngredientDetails = {
  currentIngredient: null | Iingredient
  isIngredientSelected: boolean
}
const ingredientState: TIngredientDetails = {
  currentIngredient: null,
  isIngredientSelected: false
}

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState: ingredientState,
  reducers: {
    setIngredientSelected: state => {state.isIngredientSelected = true},
    setIngredient: (state, action: PayloadAction<Iingredient>) => {state.currentIngredient = action.payload},
    clearIngredient: state => ({...state, currentIngredient: null, isIngredientSelected: false})
  }
})

export const {
  setIngredient,
  clearIngredient,
  setIngredientSelected
} = ingredientSlice.actions

export default ingredientSlice.reducer
