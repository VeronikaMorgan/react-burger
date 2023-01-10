import React from 'react';
import { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { ADD_CONSTRUCTOR_ITEM, ADD_CONSTRUCTOR_BUN, SET_PREV_ITEM, UPDATE_ON_ITEM_MOVE } from '../../services/actions/constructor';
import PropTypes from 'prop-types';
import ConstructorItem from '../constructor-item/constructor-item';
import constructorStyles from './burger-constructor.module.css';
import itemStyles from '../constructor-item/constructor-item.module.css'
import { CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import update from 'immutability-helper';

const BurgerConstructor = ({ openModal }) => {
  const data = useSelector(state => state.constructorData.constructorItems)
  const dispatch = useDispatch()

  const [{ isOver }, dropRef] = useDrop({
    accept: 'ingredient',
    drop(newItem) {
      newItem.type === 'bun'
        ? dispatch({
          type: ADD_CONSTRUCTOR_BUN,
          payload: newItem
        })
        : dispatch({
          type: ADD_CONSTRUCTOR_ITEM,
          payload: newItem
        })
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  })

  const moveItemHandler = useCallback((dragIndex, hoverIndex) => {
    const dragCard = data[dragIndex]
    const newData =  update(data, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard]
      ]
    })
    console.log(newData)
    dispatch({
      type: UPDATE_ON_ITEM_MOVE,
      payload: newData
    })
  }, [data])

  const getPrice = useMemo(() => {
    return Array.from(data).reduce((acc, i) => { return i.type === 'bun' ? acc + i.price * 2 : acc + i.price }, 0);
  }, [data])

  return (
    <section className={`${constructorStyles.wrapper} ${isOver && constructorStyles.wrapper_isOver} mt-25 pl-4`} ref={dropRef}>
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
          <li key={`${item._id}${i}`}>
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
          <Button htmlType="button" type="primary" size="large" extraClass="ml-10 mr-4" onClick={openModal}>Оформить заказ</Button>
        </div>
      }
    </section>
  )
}

BurgerConstructor.propTypes = {
  openModal: PropTypes.func,
}

export default BurgerConstructor;
