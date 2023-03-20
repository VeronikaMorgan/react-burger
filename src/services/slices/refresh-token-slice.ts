import { createSlice,  PayloadAction } from "@reduxjs/toolkit";
import { tokenOptions, baseRequest } from "../../utils/api";
import { setCookie, deleteCookie } from "../../utils/cookie";
import { createAppAsyncThunk, TThunk } from "../../utils/hooks/app-hooks";

type TRefreshState = {
  refreshTokenFailed: boolean,
  refreshTokenRequest: boolean,
  errorMessage: string | undefined
}

const refreshTokenState: TRefreshState = {
  refreshTokenFailed: false,
  refreshTokenRequest: false,
  errorMessage: ''
}
export const refreshToken = createAppAsyncThunk('refreshToken/fetch', async (_, thunkAPI) => {
    const data = await baseRequest('auth/token', tokenOptions())
    deleteCookie("access")
    deleteCookie("refresh")
    const {accessToken, refreshToken} = data

    setCookie('access', accessToken.split(' ')[1]);
    setCookie('refresh', refreshToken);
    
    return data
})

const refreshTokenSlice = createSlice({
  name: 'refreshToken',
  initialState: refreshTokenState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(refreshToken.pending, state => {state.refreshTokenRequest = true})
    builder.addCase(refreshToken.fulfilled, (state) => ({
      ...state,
      refreshTokenRequest: false,
      refreshTokenFailed: false,
      errorMessage: '',
    }))
    builder.addCase(refreshToken.rejected, (state, action: PayloadAction<string | undefined>) => ({
      ...state,
      refreshTokenRequest: false,
      refreshTokenFailed: true,
      errorMessage: action.payload,
    }))
  }
})

export default refreshTokenSlice.reducer