import React, { FC } from 'react';
import columnsStyles from './columns.module.css';

interface IColumns {
  children: React.ReactNode
}

const Columns: FC<IColumns> = ({children}) => {
  return (
    <div className={columnsStyles.columns}>
     {children}
    </div>
  )
}

export default Columns;