import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import ProtectedRouteElement from '../protected-route/protected-route';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { getIngredients } from '../../services/slices/ingredients-slice';
import { getCookie } from '../../utils/cookie';

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  let background =  location.state && location.state.background;
  console.log(background)
  useEffect(() => {
    dispatch(getIngredients())
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<LogInPage />} />
        <Route path='register' element={<SignUpPage />} />
        <Route path='forgot-password' element={<ForgetPasswordPage />} />
        <Route path='reset-password' element={<ResetPasswordPage />} />
        <Route path='feed' element={<FeedPage />} />
        <Route path='profile' element={<ProtectedRouteElement element={<ProfilePage />} />}>
          <Route path='' element={<ProtectedRouteElement element={<ProfileForm />} />} />
          <Route path='orders' element={<ProtectedRouteElement element={<ProfileOrders />} />} />
        </Route>
        <Route exact path='ingredients/:id' element={<IngredientDetails/>} />
        <Route path='*' element={<WrongRoute />} />
      </Routes>
      {background && <Route path='ingredients/:id'
      element={
      <Modal>
        <IngredientDetails/>
      </Modal>
      }/>}
    </div>
  );
}

export default App;
