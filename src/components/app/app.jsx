import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import MainPage from '../main-page/main-page';
import { getIngredients } from '../../services/reducers/ingredients';

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getIngredients())
  },[])
  
  return (
    <div className={styles.app}>
      <AppHeader />
      <MainPage />
    </div>
  );
}

export default App;
