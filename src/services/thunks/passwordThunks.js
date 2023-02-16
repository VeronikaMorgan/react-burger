import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseRequest, sendResetEmailOptions, resetPasswordOptions } from "../../utils/api";

export const sendResetEmail = createAsyncThunk('password/sendEmail', async (email, thunkAPI) => {
  try {
    const data = await baseRequest('password-reset', sendResetEmailOptions(email))
    return data
  } catch (err) {
    return thunkAPI.rejectWithValue(`someting went wrong: ${err}`)
  }
})

export const resetPassword = createAsyncThunk('password/reset', async (resetData, thunkAPI) => {
  try {
    const data = await baseRequest('password-reset/reset', resetPasswordOptions(resetData))
    return data
  } catch (err) {
    return thunkAPI.rejectWithValue(`someting went wrong: ${err}`)
  }
})