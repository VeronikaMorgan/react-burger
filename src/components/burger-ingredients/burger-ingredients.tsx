import React, { FC } from 'react';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGrid from '../ingredients-grid/ingredients-grid';
import ingredientsStyles from './burger-ingredients.module.css'

const BurgerIngredients: FC = () => {

  const rootRef = useRef<HTMLDivElement>(null)
  const bunRef = useRef<HTMLHeadingElement>(null)
  const mainRef = useRef<HTMLHeadingElement>(null)
  const sauceRef = useRef<HTMLHeadingElement>(null)

  const [inViewBunRef, bunIsInView] = useInView({
    threshold: 0.15,
    root: rootRef.current
  })
  const [inViewMainRef, mainIsInView] = useInView({
    threshold: 0.5,
    root: rootRef.current
  })
  const [inViewSauceRef, sauceIsInView] = useInView({
    threshold: 0.2,
    root: rootRef.current
  })

  const handleClick = (ref: React.RefObject<HTMLDivElement>):void => {
    ref?.current?.scrollIntoView({behavior: 'smooth'})
  }

  return (
    <section className={ingredientsStyles.section}>
      <h1 className={`${ingredientsStyles.heading} text text_type_main-large mb-5`}>Соберите бургер</h1>
      <div data-testid='ingredients-tabs' className={ingredientsStyles.tabs}>
        <Tab value="one" active={bunIsInView} onClick={() => handleClick(bunRef)}>
          Булки
        </Tab>
        <Tab value="two" active={sauceIsInView && !bunIsInView && !mainIsInView} onClick={() => handleClick(sauceRef)}>
          Соусы
        </Tab>
        <Tab value="three" active={mainIsInView || (!bunIsInView && !sauceIsInView)} onClick={() => handleClick(mainRef)}>
          Начинки
        </Tab>
      </div>
      <div data-testid='ingredients-container'className={`${ingredientsStyles.wrapper} mt-10 pr-2 my-scroll`} ref={rootRef}>
        <div ref={inViewBunRef}>
          <h2 className={`${ingredientsStyles.heading} text text_type_main-medium`} ref={bunRef}>Булки</h2>
          <IngredientsGrid type={"bun"} />
        </div>
        <div ref={inViewSauceRef}>
          <h2 className={`${ingredientsStyles.heading} text text_type_main-medium`} ref={sauceRef}>Соусы</h2>
          <IngredientsGrid type={"sauce"} />
        </div>
        <div ref={inViewMainRef}>
          <h2 className={`${ingredientsStyles.heading} text text_type_main-medium`} ref={mainRef}>Начинки</h2>
          <IngredientsGrid type={"main"} />
        </div>
      </div>
    </section>
  )
}

export default BurgerIngredients

