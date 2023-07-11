import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit'
import { createStore } from 'redux';
import {  applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import Reducers from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [
  thunk,
];
// const store = createStore( Reducers, compose(applyMiddleware(thunk)))
const store = createStore(Reducers, composeWithDevTools(
  applyMiddleware(...middleware),
  // other store enhancers if any
  ));
  
// const store = configureStore({
//   Reducers,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware(thunk)
// })


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);