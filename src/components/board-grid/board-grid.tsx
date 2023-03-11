import { type } from "os";
import React, { FC } from "react";
import gridStyles from './board-grid.module.css';

interface IBoardGridItem {
  title: string,
  data: number[] | undefined,
  color?: string
}

const BoardGridItem: FC<IBoardGridItem> = ({title, data, color}) => {
  const textColor:string = color ? color : '#F2F2F3'
  
  return (
    <div className={gridStyles.wrapper}>
      <h2 className="text text_type_main-medium mb-6 text-left">{`${title}:`}</h2>
      <ul className={`${gridStyles.data_wrapper} list-default`}>
         { data && data.map(i => (
          <li key={i}>
            <p className="text text_type_digits-default text-left" style={{color: textColor}}>{i}</p>
          </li>
          ))}
      </ul>
    </div>
  )
}

export default BoardGridItem