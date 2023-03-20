import React, { FC } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/app-hooks";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientPlate from "../orders-tape/ingredient-plate/ingredient-plate";
import itemStyles from './tape-item.module.css';
import { getOrderPrice } from "../../utils/helpers";
import { prepareIngredients } from "../../utils/prepare-ingredients";
import { filterByQwty } from "../../utils/helpers";
import { Iingredient } from "../../utils/types/types";
import { TOrderData } from "../../utils/types/ws-types";

type TTapeItemProps = {
  data: TOrderData
}
const TapeItem: FC<TTapeItemProps> = ({ data }) => {
  const [preparedData, setPreparedData] = useState<Iingredient[] | null>()
  const [price, setPrice] = useState<number>(0)
  const allIngredients = useAppSelector(store => store.ingredients.ingredients)
  const { ingredients } = data
  const location = useLocation()
  const dispatch = useAppDispatch()
  
  //find and filter ingredients
  useEffect(() => {
    if (!!allIngredients && !!ingredients) {
      const newData = prepareIngredients(ingredients, allIngredients)
      if (newData) {
        // filter not to show orders with wrong data comming
        // there still be a space in template
        setPreparedData(newData)
        setPrice(getOrderPrice(newData))

      }
    }
  }, [allIngredients, ingredients])

  return (
    !!preparedData  ?
      <Link to={`${location.pathname}/${data._id}`} state={{background: location}} className={`${itemStyles.wrapper} p-6 link-default`}>
        <div className={itemStyles.flex_wrapper}>
          <p className="text text_type_digits-default">#{data.number}</p>
          <FormattedDate date={new Date(data.createdAt)} className="text text_type_main-default text_color_inactive"/>
        </div>
        <h2 className={`${itemStyles.title} text text_type_main-medium`}>{data.name}</h2>
        <div className={itemStyles.flex_wrapper}>
          <ul className={`${itemStyles.img_list} list-default`}>
            {preparedData && preparedData.map((item, i) => {
              return i <= 5 ? (
                i === 5 && preparedData?.length > 6 ?
                  <li key={item.nanoid}>
                    <IngredientPlate name={item.name} img={item.image_mobile} qwty={preparedData.length - 6} />
                  </li>
                  :
                  <li key={item.nanoid}>
                    <IngredientPlate name={item.name} img={item.image_mobile} />
                  </li>
              )
                : null
            })}
          </ul>
          <div className={itemStyles.currency}>
            <p className="text text_type_digits-default">{price}</p>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </Link>
      : null
  )
}

export default TapeItem