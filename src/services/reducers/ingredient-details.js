import { SET_INGREDIENT_DETAILS, CLEAR_INGREDIENT_DETAILS } from "../actions/ingredient-details";

const ingredientState = {
  currentIngredient: null
}

export const ingredientReducer = (state = ingredientState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_DETAILS: {
      return {
        ...state,
        currentIngredient: action.payload
      }
    }
    case CLEAR_INGREDIENT_DETAILS: {
      return {
        ...state,
        currentIngredient: null
      }
    }
    default: return {
      state
    }
  }
}