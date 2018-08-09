import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';
import { wrap } from 'module';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
   setTextFilter = jest.fn();
   sortByDate = jest.fn();
   sortByAmount = jest.fn();
   setStartDate = jest.fn();
   setEndDate = jest.fn();

   wrapper = shallow(
      <ExpenseListFilters
         filters={filters}
         setTextFilter={setTextFilter}
         sortByAmount={sortByAmount}
         sortByDate={sortByDate}
         setStartDate={setStartDate}
         setEndDate={setEndDate}
      />
   );
});

test("should render ExpenseListFilters correctly", () => {
   expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseListFilters with alt data correctly", () => {
   // just change the filters prop in wrapper
   wrapper.setProps({
      filters: altFilters
   });
   expect(wrapper).toMatchSnapshot();
});

test('Should handle text change', () => {
   const value = 'rent';
   wrapper.find('input').simulate('change', {
      target: { value }
   });

   expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('Should sort by date', () => {
   const value = 'date';
   // just change the filters prop in wrapper
   wrapper.setProps({
      filters: altFilters
   });
   wrapper.find('select').simulate('change', {
      target: { value }
   });

   expect(sortByDate).toHaveBeenCalled();
});

test('Should sort by amount', () => {
   const value = 'amount';
   wrapper.find('select').simulate('change', {
      target: { value }
   });

   expect(sortByAmount).toHaveBeenCalled();
});

test('Should handle date changes', () => {
   const startDate = moment(0).add(4, 'years');
   const endDate = moment(0).add(8, 'years');
   wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });

   expect(setStartDate).toHaveBeenLastCalledWith(startDate);
   expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('Should handle date focus changes', () => {
   const calenderFocused = 'endDate';
   wrapper.find('DateRangePicker').prop('onFocusChange')(calenderFocused);

   expect(wrapper.state('calenderFocused')).toBe(calenderFocused);
});