import constructorReducer from './constructor-slice';
import { mockIngredient, mockBun } from '../__tests__/moks';
import { addItem, addBun, deleteItem, updateConstructor, clearConstructor, constructorState } from './constructor-slice';

describe('tests for constructor slice', () => {
  it('should return the initial state', () => {
    const constructorInit = constructorReducer(undefined, { type: 'unknown' })
    expect(constructorInit).toEqual(constructorState)
  })

  describe('should handle add item', () => {
    it('should add new item to an empty list', () => {
      const state = constructorReducer(constructorState, { type: addItem, payload: mockIngredient })
      expect(state.constructorItems).toEqual([mockIngredient])
    })
    it('should add new item to an non-empty list', () => {
      const state = constructorReducer({ ...constructorState, constructorItems: [mockIngredient] }, { type: addItem, payload: mockIngredient })
      expect(state.constructorItems).toEqual([mockIngredient, mockIngredient])
    })
  })

  describe('should handle add bun', () => {
    it('should add a bun if there is no one', () => {
      const state = constructorReducer({ constructorItems: [mockIngredient], hasBun: false }, { type: addBun, payload: mockBun })
      expect(state.hasBun).toBeTruthy()
      expect(state.constructorItems).toEqual([mockIngredient, mockBun])
    })
    it('should replace a bun with a new one', () => {
      const state = constructorReducer({ constructorItems: [mockBun, mockIngredient], hasBun: true }, { type: addBun, payload: mockBun })
      expect(state.constructorItems).toEqual([mockBun, mockIngredient])
    })
  })
  it('should delete item', () => {
    const state = constructorReducer({ constructorItems: [mockIngredient, mockBun], hasBun: true }, { type: deleteItem, payload: mockIngredient })
    expect(state.constructorItems).toEqual([mockBun])
  })
  it('should update items', () => {
    const newItems = [mockBun, mockIngredient, mockIngredient]
    const state = constructorReducer({ constructorItems: [mockIngredient, mockBun, mockIngredient], hasBun: true }, { type: updateConstructor, payload: newItems })
    expect(state.constructorItems).toEqual(newItems)
  })
  it('should clear constructor items', () => {
    const state = constructorReducer(undefined, { type: clearConstructor })
    expect(state).toEqual(constructorState)
  })
})