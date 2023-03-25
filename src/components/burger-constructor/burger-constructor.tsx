import React, { FC } from 'react';
import { useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/app-hooks';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';

import { useNavigate, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { addBun, addItem, updateConstructor } from '../../services/slices/constructor-slice';
import { getOrder } from '../../services/slices/order-slice';

import ConstructorItem from '../constructor-item/constructor-item';
import Loader from '../loader/loader';
import constructorStyles from './burger-constructor.module.css';
import itemStyles from '../constructor-item/constructor-item.module.css';
import { Iingredient } from '../../utils/types/types';
import { getOrderPrice } from '../../utils/helpers';

const BurgerConstructor: FC = () => {
  const isLoggedIn = useAppSelector(store => store.user.isLoggedIn)
  const data = useAppSelector(store => store.burgerConstructor.constructorItems);
  const hasBun = useAppSelector(store => store.burgerConstructor.hasBun)
  const isLoading = useAppSelector(store => store.order.createOrderRequest);

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const openOrderModal = () => {
    const dataIds: string[][] = data.map(item => [item._id])
    dispatch(getOrder(dataIds))
  }

  const handleSubmitOrder = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault()
    if (!getCookie('access') && !isLoggedIn) {
      return navigate('/login', { replace: true, state: { from: location.pathname } })
    }
    openOrderModal()
  }

  const [{ isOver }, dropRef] = useDrop({
    accept: 'ingredient',
    drop(newItem: Iingredient) {
      newItem.type === 'bun'
        ? dispatch(addBun(newItem))
        : dispatch(addItem(newItem))
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  })

  const moveItemHandler = useCallback((dragIndex: number, hoverIndex: number):void => {
    const dragCard = data[dragIndex]
    const newData = update(data, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard]
      ]
    })
    dispatch(updateConstructor(newData))
  }, [data])

  const getPrice = useMemo<number>(() => {
    return getOrderPrice(data)
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
          <li key={`${item.nanoid}`}>
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
          <Button htmlType="button" type="primary" size="large" extraClass={`${constructorStyles.button} ml-10 mr-4`} onClick={handleSubmitOrder} disabled={!hasBun || data.length <= 1}>
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
