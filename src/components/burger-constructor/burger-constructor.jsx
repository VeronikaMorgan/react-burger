import React from 'react';
import { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';

import { CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { addItem, addBun, updateConstructor} from '../../services/actions/constructor';
import { createOrder } from '../../services/actions/order';

import ConstructorItem from '../constructor-item/constructor-item';
import Loader from '../loader/loader';
import constructorStyles from './burger-constructor.module.css';
import itemStyles from '../constructor-item/constructor-item.module.css';


const BurgerConstructor = () => {
  const data = useSelector(store => store.constructorData.constructorItems);
  const isLoading = useSelector(store => store.orderData.createOrderRequest);
  const dispatch = useDispatch()

  const openOrderModal = (e) => {
    e.preventDefault()
    const dataIds = data.map(item => [item._id])
    dispatch(createOrder(dataIds))
  }

  const [{ isOver }, dropRef] = useDrop({
    accept: 'ingredient',
    drop(newItem) {
      newItem.type === 'bun'
        ? dispatch(addBun(newItem))
        : dispatch(addItem(newItem))
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  })

  const moveItemHandler = useCallback((dragIndex, hoverIndex) => {
    const dragCard = data[dragIndex]
    const newData = update(data, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard]
      ]
    })
    dispatch(updateConstructor(newData))
  }, [data])

  const getPrice = useMemo(() => {
    return Array.from(data).reduce((acc, i) => { return i.type === 'bun' ? acc + i.price * 2 : acc + i.price }, 0);
  }, [data])

  return (
    <section className={`${constructorStyles.wrapper} ${isOver && constructorStyles.wrapper_isOver} mt-20 pl-4`} ref={dropRef}>
      {data.map(item => {
        return item.type === 'bun' &&
          <div className={itemStyles.wrapper} key={item._id}>
            <ConstructorElement
              isLocked={true}
              thumbnail={item.image}
              price={item.price}
              type='top'
              text={`${item.name} (верх)`} />
          </div>
      })}
      <ul className={`${constructorStyles.list} list-default my-scroll pr-2`} >
        {data.map((item, i) => (item.type !== 'bun' &&
          <li key={`${item.uuid}`}>
            <ConstructorItem data={item} id={item._id} index={i} moveItemHandler={moveItemHandler} />
          </li>
        ))}
      </ul>
      {data.map(item => {
        return item.type === 'bun' &&
          <div className={itemStyles.wrapper} key={item._id}>
            <ConstructorElement
              isLocked={true}
              thumbnail={item.image}
              price={item.price}
              type='bottom'
              text={`${item.name} (низ)`} />
          </div>
      })}
      {data.length > 0 &&
        <div className={`${constructorStyles.checkout} mt-6`}>
          <p className='text text_type_digits-medium mr-2'>{getPrice}</p>
          <CurrencyIcon type='primary' />
          <Button htmlType="button" type="primary" size="large" extraClass={`${constructorStyles.button} ml-10 mr-4`} onClick={(e) => openOrderModal(e)}>
            {isLoading 
              ? <Loader />
              : 'Оформить заказ'}
          </Button>
        </div>
      }
    </section>
  )
}

export default BurgerConstructor;
