import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Columns from '../columns/columns';
import mainStyles from './main-page.module.css'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const MainPage = () => {
  // const [isOpened, setOpened] = useState(false)

  // const openIngredientDetails = (data) => {
  //   setOpened(true);
  //   setIngredientData(data)
  // }

  // const openOrderDetails = () => {
  //   setOpened(true);
  // }

  // const closeModal = () => {
  //   setOpened(false)
  //   setIngredientData(null)
  // }

  return (
    <main className={mainStyles.main}>
      <DndProvider backend={HTML5Backend}>
        <Columns>
          <BurgerIngredients  />
          <BurgerConstructor />
        </Columns>
      </DndProvider>
      {/* {!!isOpened && !!ingredientData &&
        <Modal title='Детали ингредиента' closeModal={closeModal}>
          <IngredientDetails />
        </Modal>
      }
      {!!isOpened && ingredientData === null &&
        <Modal closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      } */}
    </main>
  )
}

export default MainPage;