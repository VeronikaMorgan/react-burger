import React from "react";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import {logout} from "../../services/slices/logout-slice";
import pageStyles from '../main-styles.module.css'
import profileStyles from './user-profile-page.module.css'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const linkStyle = `${profileStyles.nav__link} link-default text text_type_main-medium isActive`
  
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <main className={profileStyles.wrapper}>
      <div>
        <nav className='pb-20'>
          <ul className={`${profileStyles.nav} list-default`}>
            <li>
              <NavLink to='' className={({ isActive }) => `${linkStyle} ${!isActive && 'text_color_inactive'}`} >Профиль</NavLink>
            </li>
            <li>
              <NavLink to='orders' className={({ isActive }) =>`${linkStyle} ${!isActive && 'text_color_inactive'}`} >История заказов</NavLink>
            </li>
            <li>
              <NavLink to='/login' className={({ isActive }) =>`${linkStyle} ${!isActive && 'text_color_inactive'}`} onClick={handleLogout}>Выход</NavLink>
            </li>
          </ul>
        </nav>
        <h2 className={`${profileStyles.description} text text_type_main-default text_color_inactive`}>
          В этом разделе вы можете
          изменить свои персональные данные
        </h2>
      </div>
     <Outlet/>
    </main>
  )
}

export default ProfilePage