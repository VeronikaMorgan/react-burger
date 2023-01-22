import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import ingredientsReducer from './services/reducers/ingredients';
import orderReducer from './services/reducers/order';
import ingredientReducer from './services/reducers/ingredient-details';
import constructorReducer from './services/reducers/constructor';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    ingredient: ingredientReducer,
    order: orderReducer,
    constructors: constructorReducer
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
