import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setIngredient } from "../../services/slices/ingredient-details-slice";
import detailsStyles from './ingredient-details.module.css';

const IngredientDetails = () => {
  const [isNotModal, setNotModal] = useState(false)
  const ingredientData = useSelector(store => store.ingredient.currentIngredient)
  const {ingredients} = useSelector(store => store.ingredients)
  const {id} = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if(!ingredientData?.name) {
      setNotModal(true)
      const currentIngredient = ingredients.find(i => i._id === id)
      dispatch(setIngredient(currentIngredient))
    }
  }, [ingredientData, ingredients])

  return (
    <div className={`${detailsStyles.wrapper} ${isNotModal && "mt-30"}`}>
      {isNotModal && <h2 className="text text_type_main-large">Детали ингредиента</h2>}
      <img src={ingredientData?.image_large} className='pr-5 pl-5' alt={ingredientData?.name} />
      <h3 className="text text_type_main-medium mt-4 mb-8">{ingredientData?.name}</h3>
      <ul className={`${detailsStyles.value} list-default`}>
        <li className={detailsStyles.value__item}>
          <h4 className="text text_type_main-default text_color_inactive">Калории,ккал</h4>
          <p className="text text_type_digits-default text_color_inactive">{ingredientData?.calories}</p>
        </li>
        <li className={detailsStyles.value__item}>
          <h4 className="text text_type_main-default text_color_inactive">Белки, г</h4>
          <p className="text text_type_digits-default text_color_inactive">{ingredientData?.proteins}</p>
        </li>
        <li className={detailsStyles.value__item}>
          <h4 className="text text_type_main-default text_color_inactive">Жиры, г</h4>
          <p className="text text_type_digits-default text_color_inactive">{ingredientData?.fat}</p>
        </li>
        <li className={detailsStyles.value__item}>
          <h4 className="text text_type_main-default text_color_inactive">Углеводы, г</h4>
          <p className="text text_type_digits-default text_color_inactive">{ingredientData?.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}


export default IngredientDetails