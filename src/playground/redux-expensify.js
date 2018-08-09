import { createStore, combineReducers } from 'redux';
import uuid from 'uuid'

// ADD_EXPENSE
const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});
// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});
// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});
// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});
// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});
// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});
// SET_START_DATE
const setStartDate = (startDate = undefined) => ({
    type: 'SET_START_DATE',
    startDate
});
// SET_END_DATE
const setEndDate = (endDate = undefined) => ({
    type: 'SET_END_DATE',
    endDate
});

// Expenses reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {

    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,           // keep the already existing expenses
                action.expense      // add the new one
            ]
            break;
        case 'REMOVE_EXPENSE':
            return state.filter(expense => expense.id !== action.id);//return with specified object removed
            break;
        case 'EDIT_EXPENSE':
            return state.map(expense => {
                if (expense.id === action.id) {
                    return {
                        ...expense,         // have the existing properties
                        ...action.updates   // override the properties passed into updates
                    }
                } else {
                    return expense;
                }
            });
            break;
        default:
            return state;
    }
};

// Filters reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {

    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
            break;
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
            break;
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
            break;
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
            break;
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
            break;
        default:
            return state
    }
};

// get visible expenses
const getVisibleExpenses = (expenses, filters) => {

    const { text, sortBy, startDate, endDate } = filters;

    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
}

// Create store
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

    console.log(visibleExpenses);
});

// add expense
// a call to dispatch returns the action object
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -21000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 }));

// // remove an expense
// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// // edit expense
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// // set text filter
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

// // sort by amount and date
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// // set start and end date
// store.dispatch(setStartDate(-2000));  // 124
// store.dispatch(setEndDate(500));  // 1240

const demoState = {
    expenses: [{
        id: 'kajsdaksjdh',
        description: 'January Rent',
        note: 'This was the final payment for that adress',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',    // date or amount
        startDate: undefined,
        endDate: undefined
    }
};