import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { tokenOptions, baseRequest } from "../../utils/api";
import { setCookie, getCookie } from "../../utils/cookie";

const refreshTokenState = {
  refreshTokenFailed: false,
  refreshTokenRequest: false,
  errorMessage: ''
}
export const refreshToken = createAsyncThunk('refreshToken/fetch', async (thunk, thunkAPI) => {
  try {
    const data = await baseRequest('auth/token', tokenOptions)
    const {accessToken, refreshToken} = data
    setCookie('access', accessToken.split(' ')[1]);
    setCookie('refresh', refreshToken);
  
    // позднее как то типизировать с приходом TS
    if(typeof(thunk) === 'function') {
      thunkAPI.dispatch(thunk())
    }
    return data
  } catch (err) {
    return thunkAPI.rejectWithValue(`someting went wrong: ${err}`)
  }
})

const refreshTokenSlice = createSlice({
  name: 'refreshToken',
  initialState: refreshTokenState,
  extraReducers: (builder) => {
    builder.addCase(refreshToken.pending, state => {state.refreshTokenRequest = true})
    builder.addCase(refreshToken.fulfilled, (state) => ({
      ...state,
      refreshTokenRequest: false,
      refreshTokenFailed: false,
      errorMessage: '',
    }))
    builder.addCase(refreshToken.rejected, (state, action) => ({
      ...state,
      refreshTokenRequest: false,
      refreshTokenFailed: true,
      errorMessage: action.payload,
    }))
  }
})

export default refreshTokenSlice.reducer