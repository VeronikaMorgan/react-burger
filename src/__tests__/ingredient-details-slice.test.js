import ingredientReducer from '../services/slices/ingredient-details-slice';
import { mockIngredient } from '../utils/moks';
import { setIngredient, clearIngredient, ingredientState } from '../services/slices/ingredient-details-slice'

describe('tests for ingredient slice', () => {
  it('should return the initial state', () => {
    const ingredientSliceInit = ingredientReducer(undefined, {type: 'unknown'})
    expect(ingredientSliceInit).toEqual(ingredientState)
  })
  it('should set chosen ingredient', () => {
    const state = ingredientReducer(ingredientState, {type: setIngredient, payload: mockIngredient})
    expect(state.currentIngredient).toEqual(mockIngredient)
  })
  it('should clear ingredient state', () => {
    const state = ingredientReducer(ingredientState, {type: clearIngredient})
    expect(state.currentIngredient).toBeNull()
  })
})