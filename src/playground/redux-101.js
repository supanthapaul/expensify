import { createStore } from 'redux'

// Action generators - functions that return action objects
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',       // caps for type is widely used and recommended
    incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',       // caps for type is widely used and recommended
    decrementBy
});

// no default value here because argument is required
const setCount = ({ count }) => ({
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET',
});

// Reducer
const countReducer = (state = { count: 0 }, action) => {

    // manupulate the state based on actions
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            }
            break;
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            }
            break;
        case 'RESET':
            return {
                count: 0
            }
            break;
        case 'SET':
            return {
                count: action.count
            }
            break;
        default:
            // it's the first time, return initial state;
            return state;
    }
};

// create the store
const store = createStore(countReducer);


// gets called every time the store state changes
// it returns a function which can be called to unsubscibe
const unsubscribe = store.subscribe(() => {
    // returns the current state object
    console.log(store.getState());
})


// ----- Actions ------

// increment the count
store.dispatch(incrementCount({ incrementBy: 5 }));
// increment again without passing incrementBy
store.dispatch(incrementCount());

// decrement the count
store.dispatch(decrementCount());

// stop listening for changes
// unsubscribe();

// reset the count
store.dispatch(resetCount());

// decrement the count by 10
store.dispatch(decrementCount({ decrementBy: 10 }));

// set the count to a given number
store.dispatch(setCount({ count: 101 }));
