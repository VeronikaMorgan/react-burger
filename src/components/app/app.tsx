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
import FeedDetails from '../feed-details/feed-details';

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
import { clearOrderDetails } from '../../services/slices/order-details-sub-slice';
import { TLocationState } from '../../utils/types/types';
import { PUBLIC, PRIVATE } from '../../services/slices/orders-slice';
import { DIGITS, STRING } from '../../utils/constants';
import { publicOrdersStart, publicOrdersStop, privateOrdersStart, privateOrdersStop } from '../../services/slices/orders-slice';

const App: FC = () => {
  const isPublicRun = useAppSelector(store => store.orders.public.isWsConnected)
  const isPrivateRun = useAppSelector(store => store.orders.private.isWsConnected)
  const ingredientSelected = useAppSelector(store => store.ingredient.currentIngredient);

  const orderSelected = useAppSelector(store => store.orders.details.currentOrder)
  const orderNumber = useAppSelector(store => store.orders.details.currentOrder?.number)

  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const state = location?.state as TLocationState

  useEffect(() => {
    dispatch(getIngredients())
  }, [])

  const closeModal = () => {
    if (!!ingredientSelected) {
      dispatch(clearIngredient())
      navigate('/', { state: { background: null } as TLocationState })
    } else if (!!orderSelected) {
      dispatch(clearOrderDetails())
      navigate(`${state.background.pathname}`, { state: { background: null } as TLocationState })
    } else {
      dispatch(clearOrder())
      dispatch(clearConstructor())
    }
  }

  useEffect(() => {
    if (location.pathname.includes('/feed') && !isPublicRun) {
      dispatch(publicOrdersStart())
    }
    if (!location.pathname.includes('/feed') && isPublicRun) {
      dispatch(publicOrdersStop())
    }
  }, [location.pathname, isPublicRun, dispatch])

  useEffect(() => {
    if (location.pathname.includes('/profile/orders') && !isPrivateRun) {
      dispatch(privateOrdersStart())
    }
    if (!location.pathname.includes('/profile/orders') && isPrivateRun) {
      dispatch(privateOrdersStop())
    }
  }, [location.pathname, isPrivateRun, dispatch])

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
        <Route path='feed/:id' element={<FeedDetails type={PUBLIC} />} />
        <Route element={<ProtectedRouteElement />}>
          <Route path='profile' element={<ProfilePage />}>
            <Route path='' element={<ProfileForm />} />
            <Route path='orders' element={<ProfileOrders />} />
          </Route>
        </Route>
        <Route element={<ProtectedRouteElement />}>
          <Route path='/profile/orders/:id' element={<FeedDetails type={PRIVATE} />} />
        </Route>
        <Route path='ingredients/:id' element={<IngredientDetails />} />
        <Route path='*' element={<WrongRoute />} />
      </Routes>

      {(state?.background?.pathname === '/') &&
        <Routes><Route path='ingredients/:id'
          element={
            <Modal closeModal={closeModal} title={'Детали ингредиента'} titleType={STRING}>
              <IngredientDetails />
            </Modal>
          } />
        </Routes>
      }
      {(state?.background?.pathname === '/feed') &&
        <Routes><Route path='feed/:id'
          element={
            <Modal closeModal={closeModal} title={`#${orderNumber}`} titleType={DIGITS}>
              <FeedDetails type={PUBLIC} />
            </Modal>
          } />
        </Routes>
      }
      {(state?.background?.pathname === '/profile/orders') &&
        <Routes><Route path='/profile/orders/:id'
          element={
            <Modal closeModal={closeModal} title={`#${orderNumber}`} titleType={DIGITS}>
              <FeedDetails type={PRIVATE} />
            </Modal>
          } />
        </Routes>
      }
    </div>
  );
}

export default App;
