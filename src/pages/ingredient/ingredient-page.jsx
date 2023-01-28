import React from "react";
import pageStyles from '../main-styles.module.css';
import ingredientStyles from '../../components/ingredient-details/ingredient-details.module.css'

const IngredientPage = ({data}) => {
  return (
    <main className={pageStyles.wrapper_sm}>
    <div className={ingredientStyles.wrapper}>
      <img src={data.image_large} className='pr-5 pl-5' alt={data.name} />
      <h3 className="text text_type_main-medium mt-4 mb-8">{data.name}</h3>
      <ul className={`${ingredientStyles.value} list-default`}>
        <li className={ingredientStyles.value__item}>
          <h4 className="text text_type_main-default text_color_inactive">Калории,ккал</h4>
          <p className="text text_type_digits-default text_color_inactive">{data.calories}</p>
        </li>
        <li className={ingredientStyles.value__item}>
          <h4 className="text text_type_main-default text_color_inactive">Белки, г</h4>
          <p className="text text_type_digits-default text_color_inactive">{data.proteins}</p>
        </li>
        <li className={ingredientStyles.value__item}>
          <h4 className="text text_type_main-default text_color_inactive">Жиры, г</h4>
          <p className="text text_type_digits-default text_color_inactive">{data.fat}</p>
        </li>
        <li className={ingredientStyles.value__item}>
          <h4 className="text text_type_main-default text_color_inactive">Углеводы, г</h4>
          <p className="text text_type_digits-default text_color_inactive">{data.carbohydrates}</p>
        </li>
      </ul>
    </div>
    </main>
  )
}

export default IngredientPage