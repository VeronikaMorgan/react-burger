import React from "react";
import PropTypes from 'prop-types';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const ConstructorItem = ({data, type}) => {
  return(
   <div style={{ display: 'flex', alignItems:'center',justifyContent:'flex-end', 'width':'563px', gap:'8px' }}>
    {data.type !== 'bun' && <DragIcon type="primary"/>}
    <ConstructorElement
     isLocked={data.type === 'bun' ? true : false}
     text={data.name}
     price={data.price}
     thumbnail={data.image}
     type={type}
     />
   </div>

  )
}

ConstructorItem.propTypes = {
  data: PropTypes.object,
  type: PropTypes.string,
}

export default ConstructorItem