import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from "../../services/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: string
}>()

export type TThunk = typeof createAppAsyncThunk