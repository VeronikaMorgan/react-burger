import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseRequest } from '../../utils/api';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from "../actions/ingredients";

const initialState = {
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
  extraReducers:(builder) => {
    builder.addCase(getIngredients.pending, state => ({...state, getIngredientsRequest: true}))
    builder.addCase(getIngredients.fulfilled,  (state, action) => ({
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