import React from 'react';
import headerStyles from './app-header.module.css';

import {
  BurgerIcon, ListIcon, ProfileIcon, Logo, Box,
} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className={`${headerStyles.header} pb-4 pt-4`}>
      <ul className={`${headerStyles.content} list-default`}>
        <li>
          <nav>
            <ul className={`${headerStyles.menu} list-default`}>
              <li>
                <a href='#' className={headerStyles.menu__link}>
                  <BurgerIcon type="primary" />
                  <p className="text text_type_main-default">Конструктор</p>
                </a>
              </li>
              <li>
                <a href='#' className={headerStyles.menu__link}>
                  <ListIcon type="primary" />
                  <p className="text text_type_main-default">Лента заказов</p>
                </a>
              </li>
            </ul>
          </nav>
        </li>
        <li className={headerStyles.logo__wrapper}>
          <a href="" className={headerStyles.header__logo}>
            <Logo />
          </a>
        </li>
        <li className={headerStyles.profile}>
          <a href="#" className={headerStyles.menu__link}>
            <ProfileIcon type="primary" />
            <p className="text text_type_main-default">Личный кабинет</p>
          </a>
        </li>
      </ul>
    </header>
  )
}

export default AppHeader;