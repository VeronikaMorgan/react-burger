import React from "react";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { ingredientType } from "../../utils/types";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './ingredient.module.css'
import { useDrag } from "react-dnd";
import { useSelector} from "react-redux";

const Ingredient = ({ data }) => {
  const constructorData = useSelector(store => store.burgerConstructor.constructorItems)
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

  return (
    <Link to={`/ingredients/${data._id}`} state={{background: location}} className={`${ingredientStyles.wrapper} ${isDrag && ingredientStyles.wrapper_onDrag} link-default `} ref={dragRef}>
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