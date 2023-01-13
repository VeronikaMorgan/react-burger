import { ADD_CONSTRUCTOR_ITEM, ADD_CONSTRUCTOR_BUN, DELETE_ITEM, UPDATE_ON_ITEM_MOVE, CLEAR_CONSTRUCTOR } from "../actions/constructor";

const constructorState = {
  constructorItems: [],
  hasBun: false,
}

export const constructorReducer = (state = constructorState, action) => {
  switch (action.type) {
    case ADD_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        constructorItems: [...state.constructorItems, action.payload]
      }
    }
    case ADD_CONSTRUCTOR_BUN: {
      return state.hasBun ?
        {
          ...state,
          constructorItems: [...state.constructorItems].map(item => item.type === 'bun' ? action.payload : item)
        }
        : {
          ...state,
          constructorItems: [...state.constructorItems, action.payload],
          hasBun: true
        }
    }
    case DELETE_ITEM: {
      return {
        ...state,
        constructorItems: action.payload.type !== 'bun'
          ? [...state.constructorItems].filter(item => item.uuid !== action.payload.uuid)
          : [...state.constructorItems]
      }
    }
    case UPDATE_ON_ITEM_MOVE: {
      return {
        ...state,
        constructorItems: action.payload
      }
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        constructorItems: [],
        hasBun: false
      }
    }
    default: {
      return state
    }
  }
}