import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients-slice";
import { constructorReducer } from "./constructor-slice";
import { ingredientReducer } from "./ingredient-details-slice";
import { orderReducer } from "./order-slice";

export const rootReducer = combineReducers({
  ingredientsData: ingredientsReducer,
  constructorData: constructorReducer,
  ingredientData: ingredientReducer,
  orderData: orderReducer
})