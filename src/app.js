import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import styles
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
// import router component
import AppRouter from './routers/AppRouter';
// import redux store
import configureStore from './store/configureStore';
// import reducers, selectors and actions
import getvisibleExpenses from './selectors/expenses';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
// ------------------------------------------------------------------ //


// initialize store
const store = configureStore();

const jsx = (
    // have to pass the store
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

// render app
ReactDOM.render(jsx, document.getElementById('app'));
