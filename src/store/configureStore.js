import { createStore, combineReducers } from 'redux';
import expensesReducer from '../reducers/expenses'
import filtersReducer from '../reducers/filters'

// exporting store so that we can create store in other file
export default () => {

    // Create store
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}
