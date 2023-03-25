import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendResetEmail, resetPassword } from "../thunks/passwordThunks";

type TPasswordState = {
  resetPasswordRequest: boolean
  resetPasswordSuccess: boolean
  resetPasswordFailed: boolean
  sendResetEmailRequest: boolean
  sendResetEmailSuccess: boolean
  sendResetEmailFailed: boolean
  errorMessage:  string | undefined
}
const passwordState: TPasswordState = {
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
  sendResetEmailRequest: false,
  sendResetEmailSuccess: false,
  sendResetEmailFailed: false,
  errorMessage: ''
}

const passwordSlice = createSlice({
  name: 'password',
  initialState: passwordState,
  reducers: {
    clearPasswordState: (state) => ({
      ...state,
      resetPasswordRequest: false,
      resetPasswordSuccess: false,
      resetPasswordFailed: false,
      sendResetEmailRequest: false,
      sendResetEmailSuccess: false,
      sendResetEmailFailed: false,
      errorMessage: ''
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(sendResetEmail.pending, state => { state.sendResetEmailRequest = true })
    builder.addCase(sendResetEmail.fulfilled, state => ({
      ...state,
      sendResetEmailRequest: false,
      sendResetEmailSuccess: true,
      sendResetEmailFailed: false,
    }))
    builder.addCase(sendResetEmail.rejected, (state, action: PayloadAction<string | undefined>) => ({
      ...state,
      sendResetEmailRequest: false,
      sendResetEmailSuccess: false,
      sendResetEmailFailed: true,
      errorMessage: action.payload
    }))
    builder.addCase(resetPassword.pending, state => { state.resetPasswordRequest = true })
    builder.addCase(resetPassword.fulfilled, state => ({
      ...state,
      resetPasswordRequest: false,
      resetPasswordSuccess: true,
      resetPasswordFailed: false,
    }))
    builder.addCase(resetPassword.rejected, (state, action: PayloadAction<string | undefined>) => ({
      ...state,
      resetPasswordRequest: false,
      resetPasswordSuccess: false,
      resetPasswordFailed: true,
      errorMessage: action.payload
    }))
  }
})

export const { clearPasswordState } = passwordSlice.actions

export default passwordSlice.reducer