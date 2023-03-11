import { createAppAsyncThunk } from "../../utils/hooks/app-hooks";
import { baseRequest, sendResetEmailOptions, resetPasswordOptions } from "../../utils/api";
import { TResetData } from "../../utils/types/types";

export const sendResetEmail = createAppAsyncThunk('password/sendEmail', async (email: string, thunkAPI) => {
    const data = await baseRequest('password-reset', sendResetEmailOptions(email))
    return data
})

export const resetPassword = createAppAsyncThunk('password/reset', async (resetData: TResetData, thunkAPI) => {
    const data = await baseRequest('password-reset/reset', resetPasswordOptions(resetData))
    return data
})