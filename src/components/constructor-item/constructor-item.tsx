import React, { FC } from "react";
import { useRef } from "react";
import { useDrag, useDrop, XYCoord  } from "react-dnd";

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from "../../utils/hooks/app-hooks";
import { deleteItem } from "../../services/slices/constructor-slice";
import itemStyles from './constructor-item.module.css'
import { IConstructorItem } from "../../utils/types";

interface IDragItem {
  id: string
  index: number
}

const ConstructorItem: FC<IConstructorItem> = ({ data, id, index, moveItemHandler }) => {
  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  const [{ handlerId }, drop] = useDrop({
    accept: 'movableItem',
    collect: monitor => ({
      handlerId: monitor.getHandlerId(),
    }),

    // have no idea how to change any 
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex:number = item.index;
      const hoverIndex:number = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const rect = ref.current
      const hoverBoundingRect = rect?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

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
  const dragItem: IDragItem = { id, index }
  const [{ isDragging }, drag] = useDrag({
    type: 'movableItem',
    item: dragItem,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  const deleteConstructorItem = () => {
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
            handleClose={deleteConstructorItem}
          />
        </>
      }
    </div>
  )
}

export default ConstructorItem