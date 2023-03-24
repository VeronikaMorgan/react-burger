import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUser, login, logout, register, patchUser } from "../thunks/userThunks";

type TUserState = {
  request: boolean,
  signUpSuccess: boolean,
  signUpFailed: boolean,
  getUserSuccess: boolean,
  getUserFailed: boolean,
  isLoggedIn: boolean,
  loginFailed: boolean,
  logoutSuccess: boolean,
  logoutFailed: boolean,
  patchSuccess: boolean,
  patchFailed: boolean,
  userData: TUserData,
  errorMessage: string | undefined
}
export const userState: TUserState = {
  request: false,
  signUpSuccess: false,
  signUpFailed: false,
  getUserSuccess: false,
  getUserFailed: false,
  isLoggedIn: false,
  loginFailed: false,
  logoutSuccess: false,
  logoutFailed: false,
  patchSuccess: false,
  patchFailed: false,
  userData: {
    name: '',
    email: ''
  },
  errorMessage: ''
}

type TUserData = {
  name: string
  email: string
}

const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    resetSignUp: (state) => {state.signUpSuccess = false},
    resetLogout: (state) => {state.logoutSuccess = false},
    resetGetUser: (state) => {state.getUserSuccess = false}
  },
  extraReducers: (builder) => {
    //register
    builder.addCase(register.pending, state => { state.request = true })
    builder.addCase(register.fulfilled, (state) => ({
      ...state,
      request: false,
      signUpSuccess: true,
      signUpFailed: false,
      errorMessage: '',
    }))
    builder.addCase(register.rejected, (state, action: PayloadAction<string | undefined>) => ({
      ...state,
      request: false,
      signUpSuccess: false,
      signUpFailed: true,
      errorMessage: action.payload,
    }))
    //login
    builder.addCase(login.pending, state => { state.request = true })
    builder.addCase(login.fulfilled, (state, action: PayloadAction<TUserData>) => ({
      ...state,
      loginFailed: false,
      request: false,
      isLoggedIn: true,
      userData: action.payload,
      errorMessage: ''
    }))
    builder.addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => ({
      ...state,
      loginFailed: true,
      request: false,
      isLoggedIn: false,
      errorMessage: action.payload
    }))
    //logout
    builder.addCase(logout.pending, state => { state.request = true })
    builder.addCase(logout.fulfilled, (state) => ({
      ...state,
      logoutFailed: false,
      request: false,
      isLoggedIn: false,
      logoutSuccess: true,
      errorMessage: '',
      userData: {
        name: '',
        email: ''
      }
    }))
    builder.addCase(logout.rejected, (state, action: PayloadAction<string | undefined>) => ({
      ...state,
      logoutFailed: true,
      request: false,
      logoutSuccess: false,
      errorMessage: action.payload
    }))
    //getUser
    builder.addCase(getUser.pending, state => { state.request = true })
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction<TUserData>) => ({
      ...state,
      request: false,
      getUserSuccess:true,
      getUserFailed:false,
      userData: action.payload,
    }))
    builder.addCase(getUser.rejected, (state, action: PayloadAction<string | undefined>) => ({
      ...state,
      request: false,
      getUserSuccess:false,
      getUserFailed:true,
      errorMessage: action.payload
    }))
    //patchUser
    builder.addCase(patchUser.pending, state => { state.request = true })
    builder.addCase(patchUser.fulfilled, (state, action: PayloadAction<TUserData>) => ({
      ...state,
      request: false,
      patchFailed: false,
      patchSuccess: true,
      userData: action.payload,
    }))
    builder.addCase(patchUser.rejected, (state, action: PayloadAction<string | undefined>) => ({
      ...state,
      patchFailed: true,
      patchSuccess: false,
      request: false,
      errorMessage: action.payload
    }))
  }
})

export const {resetSignUp, resetLogout, resetGetUser} = userSlice.actions
export default userSlice.reducer
