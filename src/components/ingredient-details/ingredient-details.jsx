import React from "react";
import PropTypes from 'prop-types';
import detailsStyles from './ingredient-details.module.css';

const IngredientDetails = ({data}) => {
 
  return (
    <div className={detailsStyles.wrapper}>
      <img src={data.image_large} className='pr-5 pl-5' alt={data.name} />
      <h3 className="text text_type_main-medium mt-4 mb-8">{data.name}</h3>
      <ul className={`${detailsStyles.value} list-default`}>
        <li className={detailsStyles.value__item}>
          <h4 className="text text_type_main-default text_color_inactive">Калории,ккал</h4>
          <p className="text text_type_digits-default text_color_inactive">{data.calories}</p>
        </li>
        <li className={detailsStyles.value__item}>
          <h4 className="text text_type_main-default text_color_inactive">Белки, г</h4>
          <p className="text text_type_digits-default text_color_inactive">{data.proteins}</p>
        </li>
        <li className={detailsStyles.value__item}>
          <h4 className="text text_type_main-default text_color_inactive">Жиры, г</h4>
          <p className="text text_type_digits-default text_color_inactive">{data.fat}</p>
        </li>
        <li className={detailsStyles.value__item}>
          <h4 className="text text_type_main-default text_color_inactive">Углеводы, г</h4>
          <p className="text text_type_digits-default text_color_inactive">{data.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  data: PropTypes.object,
}

export default IngredientDetails