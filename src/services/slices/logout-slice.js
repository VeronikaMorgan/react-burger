import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { baseRequest, logoutOptions} from "../../utils/api";
import { deleteCookie } from "../../utils/cookie";

const logoutState = {
  logoutRequest: false,
  logoutFailed: false,
  errorMessage: ''
}

export const logout = createAsyncThunk('logout/fetch', async(_, thunkAPI) => {
  try {
    const data = await baseRequest('auth/logout', logoutOptions)
    return data
  } catch(err) {
    return thunkAPI.rejectWithValue(`something went wrong: ${err}`)
  }
})

const logoutSlice = createSlice({
  name: 'logout',
  initialState: logoutState,
  extraReducers: (builder) => {
    builder.addCase(logout.pending, state => {state.logoutRequest = true})
    builder.addCase(logout.fulfilled, (state) => ({
    ...state,
    logoutFailed: false,
    logoutRequest: false,
    errorMessage: ''
    }))
    builder.addCase(logout.rejected, (state, action) => ({
      ...state,
      logoutFailed: true,
      logoutRequest: false,
      errorMessage: action.payload
    }))
  }
})

export default logoutSlice.reducer