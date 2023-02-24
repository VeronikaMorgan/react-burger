import React, { FC } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../utils/hooks/app-hooks';
import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import MainPage from '../../pages/main/main-page';
import LogInPage from '../../pages/log-in/log-in-page';
import ForgetPasswordPage from '../../pages/forget-password/forget-password-page';
import SignUpPage from '../../pages/sign-up/sign-up-page';
import ResetPasswordPage from '../../pages/reset-password/reset-password-page';
import WrongRoute from '../../pages/wrong-route/wrong-route-page';
import FeedPage from '../../pages/feed/feed-page'

import ProfilePage from '../../pages/user-profile/user-profile-page';
import ProfileForm from '../profile-form/profile-form';
import ProfileOrders from '../profile-orders/profile-orders';

import ProtectedRouteElement from '../protected-route/protected-route';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { getIngredients } from '../../services/slices/ingredients-slice';
import { clearIngredient } from '../../services/slices/ingredient-details-slice';
import { clearConstructor } from '../../services/slices/constructor-slice';
import { clearOrder } from '../../services/slices/order-slice';

export type TLocationState = {
  background : string | null;
}

const App: FC = () => {

  const details = useAppSelector(store => store.ingredient.currentIngredient);

  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const state = location?.state as TLocationState
  
  useEffect(() => {
    dispatch(getIngredients())
  }, [])

  const closeModal = () => {
    if (details) {
      dispatch(clearIngredient())
      navigate('/', { state: { background: null } as TLocationState } )
    } else {
      dispatch(clearOrder())
      dispatch(clearConstructor())
    }
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={state?.background || location}>
        <Route path="/" element={<MainPage closeModal={closeModal} />} />
        <Route path="login" element={<LogInPage />} />
        <Route path='register' element={<SignUpPage />} />
        <Route path='forgot-password' element={<ForgetPasswordPage />} />
        <Route path='reset-password' element={<ResetPasswordPage />} />
        <Route path='feed' element={<FeedPage />} />
        <Route element={<ProtectedRouteElement/>}>
          <Route path='profile' element={<ProfilePage />}>
            <Route path='' element={<ProfileForm />} />
            <Route path='orders' element={<ProfileOrders />} />
          </Route>
        </Route>
        <Route path='ingredients/:id' element={<IngredientDetails />} />
        <Route path='*' element={<WrongRoute />} />
      </Routes>

      {state?.background &&
        <Routes><Route path='ingredients/:id'
          element={
            <Modal closeModal={closeModal} title={'Детали ингредиента'}>
              <IngredientDetails />
            </Modal>
          } />
        </Routes>
      }
    </div>
  );
}

export default App;
