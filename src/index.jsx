import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import ingredientsReducer from './services/slices/ingredients-slice';
import orderReducer from './services/slices/order-slice';
import ingredientReducer from './services/slices/ingredient-details-slice';
import constructorReducer from './services/slices/constructor-slice';
import tokenReducer from './services/slices/refresh-token-slice'
import userReducer from './services/slices/user-slice'
import passwordReducer from './services/slices/password-slice'
import { BrowserRouter as Router} from 'react-router-dom';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    ingredient: ingredientReducer,
    order: orderReducer,
    burgerConstructor: constructorReducer,
    token: tokenReducer,
    user: userReducer,
    password: passwordReducer,
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
