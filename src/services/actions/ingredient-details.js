export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export const CLEAR_INGREDIENT_DETAILS = 'CLEAR_INGREDIENT_DETAILS'

export const setIngredientDetails = (data) => {
  return {
    type: SET_INGREDIENT_DETAILS,
    payload: data
  }
}

export const clearIngredientDetails = () => {
  return {
    type: SET_INGREDIENT_DETAILS,
  }
}
