import React from "react";
import PropTypes from 'prop-types';
import gridStyles from './ingredients-grid.module.css'
import Ingredient from "../ingredient/ingredient";


const IngredientsGrid = ({type, ingredients, updateConstructor, openModal}) => {
  return (
      <div className={`${gridStyles.grid} pt-6 pr-4 pb-10 pl-4`}>
        {Array.from(ingredients).filter(elem => elem.type === type).map(item => (
          <Ingredient data={item} key={item._id} updateConstructor={updateConstructor} openModal={openModal}/>
        ))}
      </div>
  )
}

IngredientsGrid.propTypes = {
  type: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.object),
  updateConstructor: PropTypes.func,
  openModal: PropTypes.func,
}

export default IngredientsGrid