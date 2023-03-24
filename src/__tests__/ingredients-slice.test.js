import ingredientsReducer from '../services/slices/ingredients-slice';
import { mockIngredients } from '../utils/moks';
import { initialState, pending, fulfilled, rejected } from '../services/slices/ingredients-slice';

describe('tests for ingredientsSlice', () => {
  it('should return the initial state', () => {
    const ingredientsSliceInit = ingredientsReducer(undefined, {type: "unknown"})
    expect(ingredientsSliceInit).toEqual(initialState)
  })
  it('should handle pending', () => {
    expect(ingredientsReducer(initialState, {type: pending.type})).toEqual({
    getIngredientsFailed: false,
    getIngredientsRequest: true,
    ingredients: [],
   })
  })
  it('should handle success', () => {
    expect(ingredientsReducer(initialState, {type: fulfilled.type, payload: mockIngredients})).toEqual({
    getIngredientsFailed: false,
    getIngredientsRequest: false,
    ingredients: mockIngredients,
   })
  })
  it('should handle error', () => {
    expect(ingredientsReducer(initialState, {type: rejected.type})).toEqual({
    getIngredientsFailed: true,
    getIngredientsRequest: false,
    ingredients: [],
   })
  })
})