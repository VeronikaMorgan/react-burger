import { createAppAsyncThunk } from "../../utils/hooks/app-hooks";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseRequest,newBaseRequest, getUserOptions, loginOptions, logoutOptions, registerOptions, patchUserOptions } from "../../utils/api";
import { refreshToken } from "../slices/refresh-token-slice";
import { setCookie, deleteCookie } from "../../utils/cookie";
import { EXPIRY_MESSAGE } from "../../utils/constants";
import { TUserData, TPatchUserData, TUserSignUpData } from "../../utils/types";

export const register = createAppAsyncThunk('auth/register', async (userData: TUserSignUpData, thunkAPI) => {
  const { email, password, name } = userData;
  try {
    const data = await baseRequest('auth/register', registerOptions(email, password, name))
    return data
  } catch (err) {
    return thunkAPI.rejectWithValue(`someting went wrong: ${err}`)
  }
})


export const getUser = createAppAsyncThunk('user/get', async (_, thunkAPI) => {
  try {
    const res = await newBaseRequest('auth/user', getUserOptions())

    if(res.status === 403) {
      console.log(res.status)
      thunkAPI.dispatch(refreshToken())
      return;
    }
    const data = await res.json()
    return data.user
  } catch (err) {
    return thunkAPI.rejectWithValue(`something went wrong: ${err}`)
  }
})

export const login = createAppAsyncThunk('auth/login', async (userData: TUserData, thunkAPI) => {
  const { email, password } = userData
  try {
    const data = await baseRequest('auth/login', loginOptions(email, password))
    const { accessToken, refreshToken } = data
    setCookie('access', accessToken.split(' ')[1]);
    setCookie('refresh', refreshToken);
    return data.user
  } catch (err) {
    return thunkAPI.rejectWithValue(`something went wrong: ${err}`)
  }
})

export const logout = createAppAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const data = await baseRequest('auth/logout', logoutOptions())
    deleteCookie("access")
    deleteCookie("refresh")
    return data
  } catch (err) {
    return thunkAPI.rejectWithValue(`something went wrong: ${err}`)
  }
})

export const patchUser = createAppAsyncThunk('user/patch', async (newData: TPatchUserData, thunkAPI) => {
  try {
    const data = await baseRequest('auth/user', patchUserOptions(newData))
    return data.user
  } catch (err) {
    if(err === 'Oшибка 404') {
      thunkAPI.dispatch(refreshToken())
    }
    return thunkAPI.rejectWithValue(`something went wrong: ${err}`)
  }
})
