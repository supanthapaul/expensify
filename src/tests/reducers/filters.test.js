import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should setup sortBy to Amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });

    expect(state.sortBy).toBe('amount');
});

test('should setup sortBy to date', () => {

    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        // start with amount so that we can see it change to date 
        sortBy: 'amount'
    };
    const action = { type: 'SORT_BY_DATE' }

    const state = filtersReducer(currentState, action);

    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {

    const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text: 'hello' });

    expect(state.text).toBe('hello');
});

test('should set startDate filter', () => {
    const startDate = moment();
    const action = {
        type: 'SET_START_DATE',
        startDate
    };
    const state = filtersReducer(undefined, action);

    expect(state.startDate).toBe(startDate);
});

test('should set endDate filter', () => {
    const endDate = moment();
    const action = {
        type: 'SET_END_DATE',
        endDate
    };
    const state = filtersReducer(undefined, action);

    expect(state.endDate).toBe(endDate);
});