import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './App';
import { startGetStore } from './actions/StoreAction';
import { startGetUser } from './actions/userAction';
import { startGetOneStore } from './actions/StoreAction';
import { startGetCategory, startGetDeletedCategory } from './actions/categoryAction';
import { startGetItem, startGetDeletedItem } from './actions/MenuItemAction';
import { startGetfilteredMenu } from './actions/homeAction';
import { startGetOrders } from './actions/orderAction';
import { startGetCompletedOrders } from './actions/orderAction';

const store=configureStore()
console.log('state',store.getState())
store.subscribe(()=>{
  console.log('state updated',store.getState())
})

const token=localStorage.getItem('token')
  if(token){
    store.dispatch(startGetUser())
    store.dispatch(startGetStore())
  }

  const storetoken=localStorage.getItem('storetoken')
  if(storetoken){
    store.dispatch(startGetOneStore())
    store.dispatch(startGetCategory())
    store.dispatch(startGetItem())
    store.dispatch(startGetDeletedCategory())
    store.dispatch(startGetDeletedItem())
    store.dispatch(startGetfilteredMenu())
    store.dispatch(startGetOrders())
    store.dispatch(startGetCompletedOrders())
  }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>
);

