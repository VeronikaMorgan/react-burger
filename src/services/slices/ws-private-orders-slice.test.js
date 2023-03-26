import { mockOrdersData } from "../__tests__/moks";
import {
  privateOrdersReducer,
  wsState,
  requestPrivateOrders,
  discardPrivateOrders,
  openPrivateOrders,
  closePrivateOrders,
  privateOrdersOnError,
  privateOrdersOnMessage
} from "./ws-private-orders-sub-slice";


describe('tests for private orders slice', () => {
  it('should return the initial state', () => {
    const state = privateOrdersReducer(undefined, { type: 'unknown' })
    expect(state).toEqual(wsState)
  })
  it('should handle private socket request', () => {
    const state = privateOrdersReducer(wsState, {type: requestPrivateOrders})
    expect(state.requestedAt).toBeTruthy()
  })
  it('should handle open private socket', () => {
    const state = privateOrdersReducer(wsState, {type: openPrivateOrders})
    expect(state.isWsConnected).toBeTruthy()
  })
  it('should handle close private socket', () => {
    const state = privateOrdersReducer(wsState, {type: closePrivateOrders})
    expect(state.isWsConnected).toBeFalsy()
  })
  it('should handle private socket on message', () => {
    const state = privateOrdersReducer(wsState, {type: privateOrdersOnMessage, payload: mockOrdersData})
    expect(state).toEqual({...wsState, ...mockOrdersData})
  })
  it('should handle private socket on error', () => {
    const state = privateOrdersReducer(wsState, {type: privateOrdersOnError, payload: 'private socked connection failed'})
    expect(state.errorMessage).toBe('private socked connection failed')
  })
}) 