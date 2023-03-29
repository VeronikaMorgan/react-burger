import { setOrderDetails, clearOrderDetails, orderState, orderDetailsReducer } from './order-details-sub-slice';
import { mockChosenOrder } from '../__tests__/moks';

describe('tests for order details slice', () => {
  it('should return the initial state', () => {
    const orderSliceInit = orderDetailsReducer(undefined, {type: 'unknown'})
    expect(orderSliceInit).toEqual(orderState)
  })
  it('should set chosen order', () => {
    const state = orderDetailsReducer(orderState, {type: setOrderDetails, payload: mockChosenOrder})
    expect(state.currentOrder).toEqual(mockChosenOrder)
  })
  it('should clear order state', () => {
    const state = orderDetailsReducer(orderState, {type: clearOrderDetails})
    expect(state.currentOrder).toBeNull()
  })
})