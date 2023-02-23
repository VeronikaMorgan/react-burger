import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { baseRequest } from '../../utils/api';
import { Iingredient } from "../../utils/types";

type TIngredientsState = {
  getIngredientsFailed: boolean
  getIngredientsRequest: boolean
  ingredients: Iingredient[]
  errorMessage: string
}
const initialState: TIngredientsState = {
  getIngredientsFailed: false,
  getIngredientsRequest: false,
  ingredients: [],
  errorMessage: ''
}

export const getIngredients = createAsyncThunk('ingredients/get', async (_, thunkAPI) => {
  try {
    const data = await baseRequest('ingredients');
    return data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(`someting went wrong: ${err}`)
  }
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

export default ingredientsSlice.reducer