import { createSlice } from "@reduxjs/toolkit";
import { sendResetEmail, resetPassword } from "../thunks/passwordThunks";

const passwordState = {
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
    builder.addCase(sendResetEmail.rejected, (state, action) => ({
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
    builder.addCase(resetPassword.rejected, (state, action) => ({
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