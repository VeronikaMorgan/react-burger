import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { constructorReducer } from "./constructor";
import { ingredientReducer } from "./ingredient-details";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
  ingredientsData: ingredientsReducer,
  constructorData: constructorReducer,
  ingredientData: ingredientReducer,
  orderData: orderReducer
})