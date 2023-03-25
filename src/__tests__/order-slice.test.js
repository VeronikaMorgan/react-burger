import orderReducer from "../services/slices/order-slice";
import { clearOrder, pending, fulfilled, rejected, orderState } from "../services/slices/order-slice";

describe('tests for order slice', () => {
  it('should return the initial state', () => {
    const orderSliceInit = orderReducer(undefined, { type: 'unknown' })
    expect(orderSliceInit).toEqual(orderState)
  })
  it('should handle pending new order', () => {
    const state = orderReducer(orderState, { type: pending.type })
    expect(state.createOrderRequest).toBeTruthy()
  })
  it('should handle post new order success', () => {
    const state = orderReducer(orderState, { type: fulfilled.type, payload: { name: '123', number: 50323 } })
    expect(state.order).toEqual({name: '123', number: 50323})
    expect(state.createOrderRequest).toBeFalsy()
  })
  it('should handle post new order failed', () => {
    const state = orderReducer(orderState, { type: rejected.type, payload: 'fetch error' })
    expect(state.createOrderRequest).toBeFalsy()
    expect(state.createOrderFailed).toBeTruthy()
    expect(state.errorMessage).toBe('fetch error')
  })
  it('should handle clear order state', () => {
    expect(orderReducer(undefined, { type: clearOrder })).toEqual(orderState)
  })
})