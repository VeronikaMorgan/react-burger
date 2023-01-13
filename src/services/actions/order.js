import { orderOptions, request } from "../../utils/api";
import { clearConstructor } from "./constructor";
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER';
export const CREATE_ORDER_FAILED = 'CREATE_FAILED';
export const CREATE_ORDER_REQUEST = 'CREATE_REQUEST';
export const CLEAR_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS';

const getOrderRequest = () => {
  return {
    type: CREATE_ORDER_REQUEST
  }
}

const getOrderFailed = (err) => {
  return {
    type: CREATE_ORDER_FAILED,
    payload: err
  }
}

const getOrderSuccess = (data) => {
  return {
    type: CREATE_ORDER_SUCCESS,
    payload: data
  }
}

export const clearOrderDetails = () => {
  return {
    type: CLEAR_ORDER_DETAILS,
  }
}

export const createOrder = (dataIds) => {
  return async (dispatch) => {
    dispatch(getOrderRequest())
    try {
      const data = await request('orders', orderOptions(dataIds))
      dispatch(getOrderSuccess(data))
      dispatch(clearConstructor())
    } catch (err) {
      dispatch(getOrderFailed(err))
    }
  }
}