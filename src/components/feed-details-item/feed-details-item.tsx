import React, { FC } from "react";
import detailsStyles from './feed-details-item.module.css';
import { Iingredient } from "../../utils/types/types";
import IngredientPlate from "../orders-tape/ingredient-plate/ingredient-plate";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

interface IFeedItem {
  data: Iingredient
}

const FeedDetailsItem: FC<IFeedItem> = ({ data }) => {
  return (
    <div className={detailsStyles.wrapper}>
     <IngredientPlate img={data.image_mobile} name={data.name}/>
      <h4 className="text text_type_main-default">{data.name}</h4>
      <div className={detailsStyles.price_wrapper}>
        <p className="text text_type_digits-default">{data.type === "bun" ? 2 : data.__v} &#215; {data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  )
}

export default FeedDetailsItem