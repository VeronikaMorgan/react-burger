import userReducer from "../services/slices/user-slice";
import {
  userState,
  resetSignUp,
  resetLogout,
  resetGetUser
} from "../services/slices/user-slice";
import { mockUser } from "../utils/moks";

import { register, login, logout, getUser, patchUser } from "../services/thunks/userThunks";

describe('tests for user slice', () => {
  it('should return the initial state', () => {
    const state = userReducer(undefined, {type: 'unknown'})
    expect(state).toEqual(userState)
  })
  
  describe('should handle sign up user', () => {
    it('should handle sign up request', () => {
      const state = userReducer(userState, register.pending())
      expect(state.request).toBeTruthy()
    })
    it('should handle sign up success', () => {
      const state = userReducer(userState, register.fulfilled())
      expect(state.request).toBeFalsy()
      expect(state.signUpSuccess).toBeTruthy()
    })
    it('should handle sign up failed', () => {
      const state = userReducer(userState,{type: register.rejected.type, payload: 'sign up error'})
      expect(state.request).toBeFalsy()
      expect(state.signUpFailed).toBeTruthy()
      expect(state.errorMessage).toBe('sign up error')
    })
    it('should reset sign up state', () => {
      const state = userReducer(userState, {type: resetSignUp})
      expect(state.signUpSuccess).toBeFalsy()
    })
  })

  describe('should handle login user', () => {
    it('should handle login request', () => {
      const state = userReducer(userState, login.pending())
      expect(state.request).toBeTruthy()
    })
    it('should handle login success', () => {
      const state = userReducer(userState, login.fulfilled(mockUser))
      expect(state.request).toBeFalsy()
      expect(state.isLoggedIn).toBeTruthy()
      expect(state.userData).toEqual(mockUser)
    })
    it('should handle login failed', () => {
      const state = userReducer(userState,{type: login.rejected.type, payload:'login error'})
      expect(state.request).toBeFalsy()
      expect(state.loginFailed).toBeTruthy()
      expect(state.errorMessage).toBe('login error')
    })
  })

  describe('should handle logout user', () => {
    it('should handle logout request', () => {
      const state = userReducer(userState, logout.pending())
      expect(state.request).toBeTruthy()
    })
    it('should handle logout success', () => {
      const state = userReducer(userState, logout.fulfilled())
      expect(state.request).toBeFalsy()
      expect(state.logoutSuccess).toBeTruthy()
      expect(state.isLoggedIn).toBeFalsy()
      expect(state.userData).toEqual({name: '', email: ''})
    })
    it('should handle logout failed', () => {
      const state = userReducer(userState, {type: logout.rejected.type, payload:'logout error'})
      expect(state.request).toBeFalsy()
      expect(state.logoutFailed).toBeTruthy()
      expect(state.errorMessage).toBe('logout error')
    })
    it('should reset logout state', () => {
      const state = userReducer(userState, {type: resetLogout})
      expect(state.logoutSuccess).toBeFalsy()
    })
  })

  describe('should handle get user', () => {
    it('should handle get user request', () => {
      const state = userReducer(userState, getUser.pending())
      expect(state.request).toBeTruthy()
    })
    it('should handle get user success', () => {
      const state = userReducer(userState, getUser.fulfilled(mockUser))
      expect(state.request).toBeFalsy()
      expect(state.getUserSuccess).toBeTruthy()
      expect(state.userData).toEqual(mockUser)
    })
    it('should handle get user failed', () => {
      const state = userReducer(userState, {type: getUser.rejected.type, payload: 'get user error'})
      expect(state.request).toBeFalsy()
      expect(state.getUserFailed).toBeTruthy()
      expect(state.errorMessage).toBe('get user error')
    })
    it('should reset get user state', () => {
      const state = userReducer(userState, {type: resetGetUser})
      expect(state.getUserSuccess).toBeFalsy()
    })
  })

  describe('should handle patch user', () => {
    it('should handle patch request', () => {
      const state = userReducer(userState, patchUser.pending())
      expect(state.request).toBeTruthy()
    })
    it('should handle patch user success', () => {
      const state = userReducer(userState, patchUser.fulfilled(mockUser))
      expect(state.request).toBeFalsy()
      expect(state.patchSuccess).toBeTruthy()
      expect(state.userData).toEqual(mockUser)
    })
    it('should handle patch user failed', () => {
      const state = userReducer(userState, {type: patchUser.rejected.type, payload: 'patch user error'})
      expect(state.request).toBeFalsy()
      expect(state.patchFailed).toBeTruthy()
      expect(state.errorMessage).toBe('patch user error')
    })
  })
})