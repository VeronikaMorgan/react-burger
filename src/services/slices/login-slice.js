import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { baseRequest, loginOptions} from "../../utils/api";
import { setCookie } from "../../utils/cookie";

const loginState = {
  loginRequest: false,
  loginFailed: false,
  errorMessage: ''
}

export const login = createAsyncThunk('login/fetch', async (userData, thunkAPI) => {
  const {email, password} = userData
  try {
    const data = await baseRequest('auth/login', loginOptions(email, password))
    const {accessToken, refreshToken} = data
    setCookie('access', accessToken.split(' ')[1]);
    setCookie('refresh', refreshToken);
    return data
  } catch(err) {
    return thunkAPI.rejectWithValue(`something went wrong: ${err}`)
  }
})

const loginSlice = createSlice({
  name: 'login',
  initialState: loginState,
  extraReducers: (builder) => {
    builder.addCase(login.pending, state => {state.loginRequest = true})
    builder.addCase(login.fulfilled, (state, action) => ({
    ...state,
    loginFailed: false,
    loginRequest: false,
    userData: action.payload,
    errorMessage: ''
    }))
    builder.addCase(login.rejected, (state, action) => ({
      ...state,
      loginFailed: true,
      loginRequest: false,
      errorMessage: action.payload
    }))
  }
})

export default loginSlice.reducer