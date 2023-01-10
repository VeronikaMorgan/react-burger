import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import gridStyles from './ingredients-grid.module.css'
import Ingredient from "../ingredient/ingredient";


const IngredientsGrid = ({type, openModal}) => {
  const ingredients = useSelector(store => store.ingredientsData.ingredients)
  return (
      <div className={`${gridStyles.grid} pt-6 pr-4 pb-10 pl-4`}>
        {Array.from(ingredients).filter(elem => elem.type === type).map(item => (
          <Ingredient data={item} key={item._id} openModal={openModal}/>
        ))}
      </div>
  )
}

IngredientsGrid.propTypes = {
  type: PropTypes.string,
  openModal: PropTypes.func,
}

export default IngredientsGrid