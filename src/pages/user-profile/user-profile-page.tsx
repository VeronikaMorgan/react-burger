import React, { FC } from "react";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../utils/hooks/app-hooks";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../services/thunks/userThunks";
import { resetLogout } from "../../services/slices/user-slice";
import profileStyles from './user-profile-page.module.css'

const ProfilePage: FC = () => {
  const logoutSuccess = useAppSelector(store => store.user.logoutSuccess)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const linkStyle: string = `${profileStyles.nav__link} link-default text text_type_main-medium isActive`

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(logout())
  }
  useEffect(() => {
    if (logoutSuccess) {
      dispatch(resetLogout())
      navigate('/login', { replace: true })
    }
  }, [logoutSuccess])

  return (
    <main className={profileStyles.container}>
      <div className={profileStyles.wrapper}>
        <section>
          <nav className='pb-20'>
            <ul className={`${profileStyles.nav} list-default`}>
              <li>
                <NavLink to='' className={({ isActive }) => `${linkStyle} ${!isActive && 'text_color_inactive'}`} >Профиль</NavLink>
              </li>
              <li>
                <NavLink to='orders' className={({ isActive }) => `${linkStyle} ${!isActive && 'text_color_inactive'}`} >История заказов</NavLink>
              </li>
              <li>
                <button className={`${profileStyles.nav__link} text text_type_main-medium text_color_inactive btn-default`} onClick={handleLogout}>Выход</button>
              </li>
            </ul>
          </nav>
          <h2 className={`${profileStyles.description} text text_type_main-default text_color_inactive`}>
            {location.pathname === '/profile/orders' ? 'В этом разделе вы можете просмотреть свою историю заказов' : 'В этом разделе вы можете изменить свои персональные данные'}
          </h2>
        </section>
        <Outlet />
      </div>
    </main>
  )
}

export default ProfilePage