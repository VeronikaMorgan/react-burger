import React, { FC } from "react";
import { useAppSelector } from "../../utils/hooks/app-hooks";

import gridStyles from './ingredients-grid.module.css'
import Ingredient from "../ingredient/ingredient";

interface IngredientsGridProps {
  type: string
}

const IngredientsGrid: FC<IngredientsGridProps> = ({ type }) => {
  const ingredients = useAppSelector(store => store.ingredients.ingredients)
  return (
      <div className={`${gridStyles.grid} pt-6 pr-3 pb-10 pl-3`}>
        {Array.from(ingredients).filter(elem => elem.type === type).map(item => (
          <Ingredient data={item} key={item._id} />
        ))}
      </div>
  )
}

export default IngredientsGrid