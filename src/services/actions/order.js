export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER';
export const CREATE_ORDER_FAILED = 'CREATE_FAILED';
export const CREATE_ORDER_REQUEST = 'CREATE_REQUEST';
export const CLEAR_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS';
const api = 'https://norma.nomoreparties.space/api/orders';

export const createOrder = (dataIds) => {
  return async (dispatch) => {
    dispatch({
      type: CREATE_ORDER_REQUEST
    })
    try {
      const res = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "ingredients": dataIds
        })
      })
      if (!res.ok) {
        return Promise.reject(`Ошибка ${res.status}`);
      }
      const data = await res.json()
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        payload: data
      })
    } catch (err) {
      dispatch({
        type: CREATE_ORDER_FAILED,
        payload: err
      })
    }
  }
}