import React from "react";
import { useEffect } from "react";
import { getUser } from "../../services/thunks/userThunks";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../services/thunks/userThunks";
import { resetLogout } from "../../services/slices/user-slice";
import profileStyles from './user-profile-page.module.css'

const ProfilePage = () => {
  const logoutSuccess = useSelector(store => store.user.logoutSuccess)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const linkStyle = `${profileStyles.nav__link} link-default text text_type_main-medium isActive`
  
  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
  }
  useEffect(() => {
    if(logoutSuccess) {
      dispatch(resetLogout())
      navigate('/login', {replace: true})
    }
  }, [logoutSuccess])

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
              <p className={`${profileStyles.nav__link} text text_type_main-medium text_color_inactive`} onClick={handleLogout}>Выход</p>
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