import passwordReducer from './password-slice';
import { clearPasswordState, passwordState } from './password-slice';
import {
  resetPasswordPending,
  resetPasswordSuccess,
  resetPasswordFailed,
  sendEmailPending,
  sendEmailSuccess,
  sendEmailFailed
} from '../thunks/passwordThunks';

describe('tests for reset password slice', () => {
  it('should return the initial state', () => {
    const passwordSliceInit = passwordReducer(undefined, { type: 'unknown' })
    expect(passwordSliceInit).toEqual(passwordState)
  })
  it('should handle send reset email request', () => {
    const state = passwordReducer(passwordState, { type: sendEmailPending })
    expect(state.sendResetEmailRequest).toBeTruthy()
  })
  it('should handle send reset email success', () => {
    const state = passwordReducer(passwordState, { type: sendEmailSuccess })
    expect(state.sendResetEmailRequest).toBeFalsy()
    expect(state.sendResetEmailSuccess).toBeTruthy()
  })
  it('should handle send reset email failed', () => {
    const state = passwordReducer(passwordState, { type: sendEmailFailed, payload: 'failed to send your email' })
    expect(state.sendResetEmailFailed).toBeTruthy()
    expect(state.sendResetEmailRequest).toBeFalsy()
    expect(state.errorMessage).toBe('failed to send your email')
  })
  it('should handle reset password request', () => {
    const state = passwordReducer(passwordState, { type: resetPasswordPending })
    expect(state.resetPasswordRequest).toBeTruthy()
  })
  it('should handle reset password success', () => {
    const state = passwordReducer(passwordState, { type: resetPasswordSuccess })
    expect(state.resetPasswordSuccess).toBeTruthy()
    expect(state.resetPasswordRequest).toBeFalsy()
  })
  it('should handle reset password failed', () => {
    const state = passwordReducer(passwordState, { type: resetPasswordFailed, payload: 'failed to reset your password' })
    expect(state.resetPasswordFailed).toBeTruthy()
    expect(state.resetPasswordRequest).toBeFalsy()
    expect(state.errorMessage).toBe('failed to reset your password')
  })
  it('should clear password state', () => {
    expect(
      passwordReducer(undefined, { type: clearPasswordState })
    ).toEqual(passwordState)
  })
})

