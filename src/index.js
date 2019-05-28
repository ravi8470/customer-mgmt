import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware} from 'redux';
import cusReducer from './store/reducers/cusReducer'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

var allCustomers = [];
(async () => {
    await fetch('http://localhost:4000/getCustomers').then(res => res.json()).then(data => {
        allCustomers = data;
        const store = createStore(cusReducer, {customers: allCustomers}, applyMiddleware(thunk) );

        ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
    })
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
