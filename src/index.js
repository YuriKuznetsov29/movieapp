import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

import App from './App';
import store from './components/store';

import './index.scss';




const app = initializeApp(
  {
    apiKey: "AIzaSyCqK-150yqJ-W6wjyQK32YWgdFXAFxrR-U",
    authDomain: "movieapp-b5187.firebaseapp.com",
    databaseURL: "https://movieapp-b5187-default-rtdb.firebaseio.com",
    projectId: "movieapp-b5187",
    storageBucket: "movieapp-b5187.appspot.com",
    messagingSenderId: "195990776993",
    appId: "1:195990776993:web:853b6781c19f93124c54e0",
    databaseURL: "https://movieapp-b5187-default-rtdb.firebaseio.com/"
  }
);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
