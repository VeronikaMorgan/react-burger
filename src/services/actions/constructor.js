export const ADD_CONSTRUCTOR_ITEM = 'ADD_CONSTRUCTOR_ITEM';
export const ADD_CONSTRUCTOR_BUN = 'ADD_CONSTRUCTOR_BUN';
export const DELETE_ITEM = 'DELETE_ITEM';
export const UPDATE_ON_ITEM_MOVE = 'UPDATE_ON_ITEM_MOVE';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export const clearConstructor = () => {
  return {
    type: CLEAR_CONSTRUCTOR
  }
}

export const addItem = (data) => {
  return {
    type: ADD_CONSTRUCTOR_ITEM,
    payload: data
  }
}

export const addBun = (data) => {
  return {
    type: ADD_CONSTRUCTOR_BUN,
    payload: data
  }
}

export const updateConstructor = (data) => {
  return {
    type: UPDATE_ON_ITEM_MOVE,
    payload: data
  }
}

export const deleteItem = (data) => {
  return {
    type: DELETE_ITEM,
    payload: data
  }
}
