import React from "react";
import { useMemo } from "react";
import PropTypes from 'prop-types';
import { ingredientType } from "../../utils/types";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './ingredient.module.css'
import { useDrag } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { setIngredientDetails} from "../../services/actions/ingredient-details";
// import { randomUUID } from "../../services/helpers/uuid-creator";

const Ingredient = ({ data }) => {
  const constructorData = useSelector(store => store.constructorData.constructorItems)
  const dispatch = useDispatch()
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
    dispatch(setIngredientDetails(data))
  }

  return (
    <button className={`${ingredientStyles.wrapper} ${isDrag && ingredientStyles.wrapper_onDrag} btn-default`} ref={dragRef} onClick={(e) => openIngredientModal(e)}>
      <img src={data.image} alt={data.name} className={`${ingredientStyles.img} mr-4 ml-4`} />
      <div className={ingredientStyles.price}>
        <p className="text text_type_digits-default">{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{data.name}</p>
      {counter > 0 && <Counter count={counter} size='default' />}
    </button>
  )
}

Ingredient.propTypes = {
  data: PropTypes.shape(ingredientType).isRequired
}

export default Ingredient;