import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { clearIngredient } from '../../services/reducers/ingredient-details';
import { clearOrder } from '../../services/reducers/order';
import { clearConstructor } from '../../services/reducers/constructor';

import Columns from '../columns/columns';
import mainStyles from './main-page.module.css'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

const MainPage = () => {
  const details = useSelector(store => store.ingredient.currentIngredient);
  const orderData = useSelector(store => store.order.order)

  const dispatch = useDispatch()
  const closeModal = () => {
    details
      ? dispatch(clearIngredient())
      : dispatch(clearOrder())
        dispatch(clearConstructor())
  }

  return (
    <main className={mainStyles.main}>
      <DndProvider backend={HTML5Backend}>
        <Columns>
          <BurgerIngredients />
          <BurgerConstructor />
        </Columns>
      </DndProvider>
      {details &&
        <Modal title='Детали ингредиента' closeModal={closeModal}>
          <IngredientDetails data={details} />
        </Modal>
      }
      {orderData &&
        <Modal closeModal={closeModal}>
          <OrderDetails orderNumber={orderData.number} />
        </Modal>
      }
    </main>
  )
}

export default MainPage;