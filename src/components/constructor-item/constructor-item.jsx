import React from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from 'prop-types';
import { ingredientType } from "../../utils/types";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from "react-redux";
import { deleteItem } from "../../services/actions/constructor";
import itemStyles from './constructor-item.module.css'

const ConstructorItem = ({ data, id, index, moveItemHandler }) => {
  const ref = useRef(null)
  const dispatch = useDispatch()

  const [{ handlerId }, drop] = useDrop({
    accept: 'movableItem',
    collect: monitor => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const rect = ref.current
      const hoverBoundingRect = rect?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItemHandler(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'movableItem',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  const deleteItem = () => {
    dispatch(deleteItem(data))
  }

  return (
    <div className={`${itemStyles.wrapper} ${itemStyles.wrapper_draggable}`} id={id} ref={ref} data-handler-id={handlerId} >
      {isDragging ?
        <div className={itemStyles.dragging}></div>
        : <>
          <DragIcon type="primary" />
          <ConstructorElement
            text={data.name}
            price={data.price}
            thumbnail={data.image}
            handleClose={deleteItem}
          />
        </>
      }
    </div>
  )
}

ConstructorItem.propTypes = {
  data: PropTypes.shape(ingredientType).isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  moveItemHandler: PropTypes.func.isRequired
}
export default ConstructorItem