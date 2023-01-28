import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserOptions, baseRequest } from "../../utils/api";
import { getIngredients } from "./ingredients-slice";
import { getCookie } from "../../utils/cookie";
import { refreshToken } from "./refresh-token-slice";
const userState = {
  getUserRequest: false,
  getUserFailed: false,
  userData: {},
  isLogin: false,
}

export const getUser = createAsyncThunk('user/get', async(_, thunkApi) => {
  try {
    if(!getCookie('access')) {
      thunkApi.dispatch(refreshToken(getUser))
    }
    const data = await baseRequest('auth/user', getUserOptions)
    return data
  } catch(err) {
    return thunkApi.rejectWithValue(`something went wrong: ${err}`)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, state => {state.getUserRequest = true})
    builder.addCase(getUser.fulfilled, (state, action) => ({
    ...state,
    getUserFailed: false,
    getUserRequest: false,
    userData: action.payload,
    }))
    builder.addCase(getUser.rejected, (state) => ({
      ...state,
      getUserFailed: true,
      getUserRequest: false,
    }))
  }
})

export default userSlice.reducer
