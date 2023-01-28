import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerOptions, baseRequest } from "../../utils/api";
import { setCookie } from "../../utils/cookie";

const registrationState = {
  registrationFailed: false,
  registrationRequest: false,
  errorMessage: ''
}
export const register = createAsyncThunk('registration/fetch', async (userData, thunkAPI) => {
  const {email, password, name} = userData;
  try {
    const data = await baseRequest('auth/register', registerOptions(email, password, name))
    return data
  } catch (err) {
    return thunkAPI.rejectWithValue(`someting went wrong: ${err}`)
  }
})

const registerSlice = createSlice({
  name: 'registration',
  initialState: registrationState,
  extraReducers: (builder) => {
    builder.addCase(register.pending, state => {state.registrationRequest = true})
    builder.addCase(register.fulfilled, (state) => ({
      ...state,
      registrationRequest: false,
      registrationFailed: false,
      errorMessage: '',
    }))
    builder.addCase(register.rejected, (state, action) => ({
      ...state,
      registrationRequest: false,
      registrationFailed: true,
      errorMessage: action.payload,
    }))
  }
})

export default registerSlice.reducer