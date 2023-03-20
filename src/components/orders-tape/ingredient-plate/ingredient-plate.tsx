import React, { FC } from "react";
import plateStyles from './ingredient-plate.module.css'
type TIngredientPlate = {
  img: string,
  name: string,
  qwty?: number
}
const IngredientPlate: FC<TIngredientPlate> = ({ img, name, qwty }) => {
  return (
    <div className={plateStyles.img_border}>
      <div className={plateStyles.img_wrapper} >
        {qwty && <div className={`${plateStyles.img_overlay} text text_type_main-default`}>&#43;{qwty}</div>}
        <img src={img} alt={name} className={plateStyles.img} />
      </div>
    </div>
  )
}

export default IngredientPlate