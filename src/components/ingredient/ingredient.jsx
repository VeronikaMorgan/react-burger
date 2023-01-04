import React from "react";
import { useRef, useState } from "react";
import PropTypes from 'prop-types';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './ingredient.module.css'


const Ingredient = ({data, updateConstructor, openModal}) => {
  const [isOpenedIngredient, setOpenedIngredient] = useState(false)
  const [counter, setCounter] = useState(0)
  const handleClick = () => {
    updateConstructor(data);
    // setCounter(counter + 1)
    openModal(data)
  }

  return(
    <>
      <button className={`${ingredientStyles.wrapper} btn-default`} onClick={handleClick} >
        <img src={data.image} className={`${ingredientStyles.img} mr-4 ml-4`}/>
        <div className={ingredientStyles.price}>
          <p className="text text_type_digits-default">{data.price}</p>
          <CurrencyIcon type="primary"/>
        </div>
        <p className="text text_type_main-default">{data.name}</p>
        {counter > 0 && <Counter count={counter} size='default' />}
      </button>
    </>
  )
}

Ingredient.propTypes = {
  data: PropTypes.object,
  updateConstructor: PropTypes.func,
  openModal: PropTypes.func,
}

export default Ingredient;