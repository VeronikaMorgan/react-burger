import React from "react";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { ingredientType } from "../../utils/types";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './ingredient.module.css'
import { useDrag } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { setIngredient } from "../../services/slices/ingredient-details-slice";
// import { randomUUID } from "../../services/helpers/uuid-creator";

const Ingredient = ({ data }) => {
  const constructorData = useSelector(store => store.burgerConstructor.constructorItems)

  const dispatch = useDispatch()
  const location = useLocation()

  const counter = useMemo(() => {
    return data.type === 'bun'
      ? constructorData.filter(item => item._id === data._id).length * 2
      : constructorData.filter(item => item._id === data._id).length
  }, [constructorData])

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...data, uuid: Date.now() },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  })

  const openIngredientModal = (e) => {
    e.preventDefault()
    dispatch(setIngredient(data))
  }

  return (
    <Link to={{ pathname:`/ingredients/${data._id}`, state: {background: location}}} className={`${ingredientStyles.wrapper} ${isDrag && ingredientStyles.wrapper_onDrag} link-default `} ref={dragRef} onClick={openIngredientModal}>
      <img src={data.image} alt={data.name} className={`${ingredientStyles.img} mr-4 ml-4`} />
      <div className={ingredientStyles.price}>
        <p className="text text_type_digits-default">{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{data.name}</p>
      {counter > 0 && <Counter count={counter} size='default' />}
    </Link>
  )
}

Ingredient.propTypes = {
  data: PropTypes.shape(ingredientType).isRequired
}

export default Ingredient;