import React from 'react';
import headerStyles from './app-header.module.css';
import { NavLink, Link, useMatch } from 'react-router-dom';
import {
  BurgerIcon, ListIcon, ProfileIcon, Logo, Box,
} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {

  const isConstructor = useMatch('/')
  const isFeed = useMatch('/feed')
  const isProfile = useMatch('/profile')
  return (
    <header className={`${headerStyles.header} pb-4 pt-4`}>
      <ul className={`${headerStyles.content} list-default`}>
        <li>
          <nav>
            <ul className={`${headerStyles.menu} list-default`}>
              <li>
                <Link
                  to='/'
                  className={headerStyles.menu__link}
                >
                  <BurgerIcon type={isConstructor ? "primary" : "secondary"} />
                  <p className={`text text_type_main-default ${!isConstructor && 'text_color_inactive'}`}>Конструктор</p>
                </Link>
              </li>
              <li>
                <Link
                  to='/feed'
                  className={headerStyles.menu__link}
                >
                  <ListIcon type={isFeed ? "primary" : "secondary"} />
                  <p className={`text text_type_main-default ${!isFeed && 'text_color_inactive'}`}>Лента заказов</p>
                </Link>
              </li>
            </ul>
          </nav>
        </li>
        <li className={headerStyles.logo__wrapper}>
          <Link to="/" className={headerStyles.header__logo}>
            <Logo />
          </Link>
        </li>
        <li className={headerStyles.profile}>
          <Link to='/profile' className={headerStyles.menu__link}>
            <ProfileIcon type={isProfile ? "primary" : "secondary"} />
            <p className={`text text_type_main-default ${!isProfile && 'text_color_inactive'}`}>Личный кабинет</p>
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default AppHeader;