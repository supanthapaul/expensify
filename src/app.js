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

store.dispatch(addExpense({ description: 'Water bill', amount: 5000 }));
store.dispatch(addExpense({ description: 'Gas bill', amount: 3000, createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 109500 }));


const state = store.getState();
const visibleExpenses = getvisibleExpenses(state.expenses, state.filters);

console.log(visibleExpenses);

const jsx = (
    // have to pass the store
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

// render app
ReactDOM.render(jsx, document.getElementById('app'));
