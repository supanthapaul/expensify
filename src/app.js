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
import { startSetExpenses } from './actions/expenses';
import './firebase/firebase';

// initialize store
const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(startSetExpenses()).then(() => {
    ReactDOM.render(jsx, document.getElementById('app'));
});