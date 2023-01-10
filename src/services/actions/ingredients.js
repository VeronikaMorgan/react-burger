export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

const api = 'https://norma.nomoreparties.space/api/ingredients'

export function getIngredients () {
  return async (dispatch) => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })
    try {
      let res = await fetch(api)
      let data = await res.json()
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: data.data
      })
    } catch(err) {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
        payload: err
      })
    }
  }
}


