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

const MainPage = ({ingredients}) => {
  const [constructorState, setConstructorState] = useState([]);
  const [isOpened, setOpened] = useState(false)
  const [ingredientData, setIngredientData] = useState(null)
  
  const openIngredientDetails = (data) => {
    setOpened(true);
    setIngredientData(data)
  }

  const openOrderDetails = () => {
    setOpened(true);
  }

  const closeModal = () => {
    setOpened(false)
    setIngredientData(null)
  }
  
  // const hasBun = (data) => {
  //   const index = data.findIndex((el) => {return el.type === 'bun'})
  //   return index;
  // }
  
  const updateConstructorData = useCallback((ingredientData) => {
    // const index = hasBun(constructorState);
    // const newState = (ingredientData.type === 'bun' && index >= 0)
    // ? constructorState.slice().splice(index, 1, ingredientData)
    // : [...constructorState, ingredientData]
    setConstructorState([...constructorState, ingredientData]);
  })

  return (
    <main className={mainStyles.main}>
      <Columns>
        <BurgerIngredients ingredients={ingredients} updateConstructor={updateConstructorData} openModal={openIngredientDetails}/>
        <BurgerConstructor data={constructorState} openModal={openOrderDetails}/>
      </Columns>
      {!!isOpened && !!ingredientData && 
        <Modal title='Детали ингредиента' closeModal={closeModal}>
          <IngredientDetails data={ingredientData}/>
        </Modal>
      }
      {!!isOpened && ingredientData === null &&
        <Modal closeModal={closeModal}>
          <OrderDetails/>
        </Modal>
      }
    </main>
  )
}

MainPage.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object)
}

export default MainPage;