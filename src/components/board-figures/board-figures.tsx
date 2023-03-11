import React, { FC } from "react";
import figuresStyles from './board-figures.module.css'

interface IBoardFigures {
  title: string
  figure: number | string
}
const BoardFigures: FC<IBoardFigures> = ({title, figure}) => {
  return (
    <div className={figuresStyles.wrapper}>
      <h2 className="text text_type_main-medium">{title}:</h2>
      <p className="text text_type_digits-large text-shadow">{figure}</p>
    </div>
  )
}

export default BoardFigures