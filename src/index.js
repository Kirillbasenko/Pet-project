import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './style/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux"
import store from "./store"
import { initializeApp } from 'firebase/app';

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
      //<React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      //</React.StrictMode>
    )




