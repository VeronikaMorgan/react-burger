import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  CLEAR_ORDER_DETAILS
} from "../actions/order";

const orderData = {
  order: null,
  createOrderFailed: false,
  createOrderRequest: false,
  errorMessage: ''
}

export const orderReducer = (state = orderData, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        createOrderRequest: true
      }
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        createOrderRequest: false,
        createOrderFailed: false,
        order: {
          name: action.payload.name,
          number: action.payload.order.number
        }
      }
    }
    case CREATE_ORDER_FAILED: {
      return {
        ...state,
        createOrderFailed: true,
        createOrderRequest: false,
        errorMessage: action.payload
      }
    }
    case CLEAR_ORDER_DETAILS: {
      return {
        ...state,
        createOrderRequest: false,
        createOrderFailed: false,
        order: null,
        errorMessage: ''
      }
    }
    default: {
      return state
    }
  }
}