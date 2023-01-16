import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from "../actions/ingredients";

const initialState = {
  getIngredientsFailed: false,
  getIngredientsRequest: false,
  ingredients: [],
  errorMessage: ''
}
export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        getIngredientsRequest: true
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        getIngredientsRequest: false,
        getIngredientsFailed: false,
        ingredients: action.payload
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        getIngredientsFailed: true,
        getIngredientsRequest: false
      }
    }
    default: {
      return state
    }
  }
}

