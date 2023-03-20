import React, { FC } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './ingredient.module.css'
import { useDrag } from "react-dnd";
import { useAppSelector } from "../../utils/hooks/app-hooks";
import { Iingredient } from "../../utils/types/types";

interface IngredientProps {
  data: Iingredient
}

const Ingredient: FC<IngredientProps> = ({ data }) => {
  const constructorData = useAppSelector(store => store.burgerConstructor.constructorItems)
  const location = useLocation()

  const counter = useMemo<number>(() => {
    return data.type === 'bun'
      ? constructorData.filter(item => item._id === data._id).length * 2
      : constructorData.filter(item  => item._id === data._id).length
  }, [constructorData])
  
  const itemObj = (data: Iingredient):Iingredient => { return { ...data, nanoid: nanoid()}}

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: itemObj(data),
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

export default Ingredient;
