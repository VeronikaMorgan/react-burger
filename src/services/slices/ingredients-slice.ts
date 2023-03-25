import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { baseRequest } from '../../utils/api';
import { Iingredient } from "../../utils/types/types";

type TIngredientsState = {
  getIngredientsFailed: boolean
  getIngredientsRequest: boolean
  ingredients: Iingredient[]
}
export const initialState: TIngredientsState = {
  getIngredientsFailed: false,
  getIngredientsRequest: false,
  ingredients: [],
}

export const getIngredients = createAsyncThunk('ingredients/get', async (_, thunkAPI) => {
    const data = await baseRequest('ingredients');
    return data.data;
})

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder.addCase(getIngredients.pending, state => ({...state, getIngredientsRequest: true}))
    builder.addCase(getIngredients.fulfilled,  (state, action: PayloadAction<Iingredient[]>) => ({
      ...state,
      getIngredientsRequest: false,
      getIngredientsFailed: false,
      ingredients: action.payload
    }))
    builder.addCase(getIngredients.rejected, state => ({
      ...state,
      getIngredientsFailed: true,
      getIngredientsRequest: false
    }))
  }
})

export const {
  pending,
  fulfilled,
  rejected
} = getIngredients

export default ingredientsSlice.reducer