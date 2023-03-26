import {
  wsState,
  publicOrdersReducer,
  requestPublicOrders,
  discardPublicOrders,
  openPublicOrders,
  closePublicOrders,
  publicOrdersOnError,
  publicOrdersOnMessage
} from "./ws-public-orders-sub-slice";

import { mockOrdersData } from "../__tests__/moks";


describe('tests for public orders slice', () => {
  it('should return the initial state', () => {
    const state = publicOrdersReducer(undefined, { type: 'unknown' })
    expect(state).toEqual(wsState)
  })
  it('should handle public socket request', () => {
    const state = publicOrdersReducer(wsState, {type: requestPublicOrders})
    expect(state.requestedAt).toBeTruthy()
  })
  it('should handle open public socket', () => {
    const state = publicOrdersReducer(wsState, {type: openPublicOrders})
    expect(state.isWsConnected).toBeTruthy()
  })
  it('should handle close public socket', () => {
    const state = publicOrdersReducer(wsState, {type: closePublicOrders})
    expect(state.isWsConnected).toBeFalsy()
  })
  it('should handle public socket on message', () => {
    const state = publicOrdersReducer(wsState, {type: publicOrdersOnMessage, payload: mockOrdersData})
    expect(state).toEqual({...wsState, ...mockOrdersData})
  })
  it('should handle public socket on error', () => {
    const state = publicOrdersReducer(wsState, {type: publicOrdersOnError, payload: 'public socked connection failed'})
    expect(state.errorMessage).toBe('public socked connection failed')
  })
}) 