import React from 'react';
import PropTypes from 'prop-types';
import ingredientsStyles from './burger-ingredients.module.css'
import Tabs from '../tabs/tabs';
import IngredientsGrid from '../ingredients-grid/ingredients-grid';

const BurgerIngredients = ({ingredients, updateConstructor, openModal}) => {

  return (
    <section className={ingredientsStyles.section}>
      <h1 className={`${ingredientsStyles.heading} text text_type_main-large mb-5`}>Соберите бургер</h1>
      <Tabs />
      <div className={`${ingredientsStyles.wrapper} mt-10 pr-2 my-scroll`}>
        <h2 className={`${ingredientsStyles.heading} text text_type_main-medium`}>Булки</h2>
        <IngredientsGrid type={"bun"} ingredients={ingredients} updateConstructor={updateConstructor} openModal={openModal}/>
        <h2 className={`${ingredientsStyles.heading} text text_type_main-medium`}>Соусы</h2>
        <IngredientsGrid type={"sauce"} ingredients={ingredients} updateConstructor={updateConstructor} openModal={openModal}/>
        <h2 className={`${ingredientsStyles.heading} text text_type_main-medium`}>Начинки</h2>
        <IngredientsGrid type={"main"} ingredients={ingredients} updateConstructor={updateConstructor} openModal={openModal}/>
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object),
  updateConstructor: PropTypes.func,
  openModal: PropTypes.func,
}

export default BurgerIngredients

// // function defineType (arr) {
//   const sortedIngr = {};
//   arr.forEach(ingedient => {
//     sortedIngr[ingedient.type] ? sortedIngr[ingedient.type].push(ingedient) : sortedIngr[ingedient.type] = [ingedient]
//   })
//   const finalArr = Object.entries(sortedIngr);
//   return finalArr
// // }
