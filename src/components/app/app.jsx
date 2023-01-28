import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import MainPage from '../main-page/main-page';
import LogInPage from '../../pages/log-in/log-in-page';
import ForgetPasswordPage from '../../pages/forget-password/forget-password-page';
import SignUpPage from '../../pages/sign-up/sign-up-page';
import ResetPasswordPage from '../../pages/reset-password/reset-password-page';
import IngredientPage from '../../pages/ingredient/ingredient-page';
import ProfilePage from '../../pages/user-profile/user-profile-page';
import WrongRoute from '../../pages/wrong-route/wrong-route-page';
import FeedPage from '../../pages/feed/feed-page'
import ProfileForm from '../profile-form/profile-form';
import ProfileOrders from '../profile-orders/profile-orders';
import { getIngredients } from '../../services/slices/ingredients-slice';
import { register } from '../../services/slices/register-slice';
import { login } from '../../services/slices/login-slice';
import {logout} from '../../services/slices/logout-slice';
import { getCookie } from '../../utils/cookie';
import { getUser } from '../../services/slices/user-slice';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getIngredients())
  }, [])
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes >
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<LogInPage />} />
        <Route path='register' element={<SignUpPage />} />
        <Route path='forgot-password' element={<ForgetPasswordPage />} />
        <Route path='reset-password' element={<ResetPasswordPage />} />
        <Route path='feed' element={<FeedPage/>} />
        <Route path='profile' element={<ProfilePage />}>
          <Route path='' element={<ProfileForm/>}/>
          <Route path='orders' element={<ProfileOrders/>}/>
        </Route>
        <Route path='ingredients/:id' element={<IngredientPage />} />
        <Route path='wrong' element={<WrongRoute/>} />
      </Routes>
    </div>
  );
}

export default App;
