import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseRequest, getUserOptions, loginOptions, logoutOptions, registerOptions, patchUserOptions } from "../../utils/api";
import { refreshToken } from "../slices/refresh-token-slice";
import { setCookie, deleteCookie } from "../../utils/cookie";
import { EXPIRY_MESSAGE } from "../../utils/constants";
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  const { email, password, name } = userData;
  try {
    const data = await baseRequest('auth/register', registerOptions(email, password, name))
    return data
  } catch (err) {
    return thunkAPI.rejectWithValue(`someting went wrong: ${err}`)
  }
})

export const getUser = createAsyncThunk('user/get', async (_, thunkAPI) => {
  try {
    const data = await baseRequest('auth/user', getUserOptions())
    return data.user
  } catch (err) {
    if(err === 'Oшибка 404') {
      thunkAPI.dispatch(refreshToken(getUser))
    }
    return thunkAPI.rejectWithValue(`something went wrong: ${err}`)
  }
})

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
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

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const data = await baseRequest('auth/logout', logoutOptions())
    deleteCookie("access")
    deleteCookie("refresh")
    return data
  } catch (err) {
    return thunkAPI.rejectWithValue(`something went wrong: ${err}`)
  }
})

export const patchUser = createAsyncThunk('user/patch', async (newData, thunkAPI) => {
  try {
    const data = await baseRequest('auth/user', patchUserOptions(newData))
    return data.user
  } catch (err) {
    if(err === 'Oшибка 404') {
      thunkAPI.dispatch(refreshToken(getUser))
    }
    return thunkAPI.rejectWithValue(`something went wrong: ${err}`)
  }
})
