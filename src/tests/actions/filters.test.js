import { setStartDate, setEndDate, sortByAmount, sortByDate, setTextFilter } from '../../actions/filters'
import moment from 'moment'


test('should generate set start date action onject', () => {
    const action = setStartDate(moment(0));

    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});


test('should generate set end date action onject', () => {

    const action = setEndDate(moment(0));

    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
});


test('should generate sortByAmount action onject', () => {

    expect(sortByAmount()).toEqual({
        type: 'SORT_BY_AMOUNT'
    });
});

test('should generate sortByDate action onject', () => {

    expect(sortByDate()).toEqual({
        type: 'SORT_BY_DATE'
    });
});


test('should generate setTextFilter action onject with default values', () => {

    const action = setTextFilter();

    expect(setTextFilter()).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});

test('should generate setTextFilter action onject with Provided values', () => {

    const action = setTextFilter('Hello World');

    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'Hello World'
    });
});