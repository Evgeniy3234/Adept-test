import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Tables from './components/Tables'
import {Provider} from 'react-redux'
import {store} from './RTK/index'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Tables />        
  </Provider>
);


