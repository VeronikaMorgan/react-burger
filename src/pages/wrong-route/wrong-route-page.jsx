import React from "react";
import bottom from '../../images/animation/bottom-bun.png'
import onion from '../../images/animation/onion.png'
import chop from '../../images/animation/chop.png'
import salad from '../../images/animation/salad.png'
import cheese from '../../images/animation/cheese.png'
import top from '../../images/animation/top-bun.png'
import styles from './wrong-route-page.module.css'
import pageStyles from '../main-styles.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from "react-router-dom";
const WrongRoute = () => {
  return (
    <main className={pageStyles.wrapper_sm}>
      <div className={styles.animation_wrapper}>
        <img src={top} alt="" className={styles.bun_top} />
        <img src={cheese} alt="" className={styles.cheese} />
        <img src={onion} alt="" className={styles.onion} />
        <img src={chop} alt="" className={styles.chop} />
        <img src={salad} alt="" className={styles.salad} />
        <img src={bottom} alt="" className={styles.bun_bottom} />
      </div>
      <h2 className="text text_type_digits-large text_color_inactive">404</h2>
      <p className="text text_type_main-medium">Похоже что-то пошло не так</p>
      <p className="text text_type_main-default text_color_inactive mt-1">или мы устали готовить</p>
      <Link to='/' className="link-default"><p className="text text_type_main-small text_color_inactive mt-1">на кухню &rarr;</p></Link>
    </main>
  )
}

export default WrongRoute