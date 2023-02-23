import { createAppAsyncThunk } from "../../utils/hooks/app-hooks";
import { baseRequest, sendResetEmailOptions, resetPasswordOptions } from "../../utils/api";
import { TResetData } from "../../utils/types";

export const sendResetEmail = createAppAsyncThunk('password/sendEmail', async (email: string, thunkAPI) => {
  try {
    const data = await baseRequest('password-reset', sendResetEmailOptions(email))
    return data
  } catch (err) {
    return thunkAPI.rejectWithValue(`someting went wrong: ${err}`)
  }
})

export const resetPassword = createAppAsyncThunk('password/reset', async (resetData: TResetData, thunkAPI) => {
  try {
    const data = await baseRequest('password-reset/reset', resetPasswordOptions(resetData))
    return data
  } catch (err) {
    return thunkAPI.rejectWithValue(`someting went wrong: ${err}`)
  }
})