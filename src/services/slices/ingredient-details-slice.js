
import { createSlice } from "@reduxjs/toolkit";

const ingredientState = {
  currentIngredient: null
}

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState: ingredientState,
  reducers: {
    setIngredient: (state, action) => {state.currentIngredient = action.payload},
    clearIngredient: state => {state.currentIngredient = null}
  }
})

export const {
  setIngredient,
  clearIngredient,
} = ingredientSlice.actions

export default ingredientSlice.reducer
