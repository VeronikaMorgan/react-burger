import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients-slice';
import orderReducer from './slices/order-slice';
import ingredientReducer from './slices/ingredient-details-slice';
import constructorReducer from './slices/constructor-slice';
import tokenReducer from './slices/refresh-token-slice'
import userReducer from './slices/user-slice'
import passwordReducer from './slices/password-slice'

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    ingredient: ingredientReducer,
    order: orderReducer,
    burgerConstructor: constructorReducer,
    token: tokenReducer,
    user: userReducer,
    password: passwordReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch