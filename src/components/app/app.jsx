import React from 'react';
import { useState, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import MainPage from '../main-page/main-page';
// import { getIngredients } from '../../services/api';

function App() {
  const [ingredients, setIngredients] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  
  useEffect(() => {
    const getData = async() => {
      try{
        let res = await fetch("https://norma.nomoreparties.space/api/ingredients")
        let data = await res.json();
        setIngredients(data.data);
      } catch(err) {
        console.log(err)
      }
    }
    getData()
  },[])

  return (
    <div className={styles.app}>
      <AppHeader />
      <MainPage ingredients={ingredients}/>
    </div>
  );
}

export default App;
