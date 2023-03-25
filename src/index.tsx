import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom';

import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { store } from './services/store';
import './index.css';

const rootAr = document.getElementById('root') as HTMLDivElement
const root = ReactDOM.createRoot(rootAr) as ReactDOM.Root;

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
