import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('Should render ExpenseForm correctly', () => {
   const wrapper = shallow(<ExpenseForm />);
   expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
   const wrapper = shallow(<ExpenseForm expense={expenses[0]} />)
   expect(wrapper).toMatchSnapshot();
});

test('Should render error for invalid form submission', () => {
   const wrapper = shallow(<ExpenseForm />);
   expect(wrapper).toMatchSnapshot();
   // get the form and simulate event
   // https://airbnb.io/enzyme/docs/api/ShallowWrapper/simulate.html
   wrapper.find('form').simulate('submit', {
      preventDefault: () => { }   // fake the preventDefault function
   });
   // test the error state
   expect(wrapper.state('error').length).toBeGreaterThan(0);
   expect(wrapper).toMatchSnapshot();
});

test('Should set description on input change', () => {
   const value = 'New Description';
   const wrapper = shallow(<ExpenseForm />);
   // get description input
   wrapper.find('input').at(0).simulate('change', {
      target: { value }   // fake e.target.value
   });
   expect(wrapper.state('description')).toBe(value);
});

test('Should set note on textarea change', () => {
   const value = 'New Note!';
   const wrapper = shallow(<ExpenseForm />);
   // get note textarea
   wrapper.find('textarea').simulate('change', {
      target: { value }   // fake e.target.value
   });
   expect(wrapper.state('note')).toBe(value);
});

test('Should set amount if valid input', () => {
   const validvalue = '25.50';
   const wrapper = shallow(<ExpenseForm />);
   // get amount input
   wrapper.find('input').at(1).simulate('change', {
      target: { value: validvalue }   // fake e.target.value
   });
   expect(wrapper.state('amount')).toBe(validvalue);
});

test('Should not set amount if invalid input', () => {
   const invalidvalue = '25.502';
   const wrapper = shallow(<ExpenseForm />);
   // get amount input
   wrapper.find('input').at(1).simulate('change', {
      target: { value: invalidvalue }   // fake e.target.value
   });
   expect(wrapper.state('amount')).toBe('');
});

test('Should call onSubmit prop on valid form submission', () => {
   const onSubmitSpy = jest.fn();
   const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);

   wrapper.find('form').simulate('submit', {
      preventDefault: () => { }   // fake the preventDefault function
   });
   // expect no errors
   expect(wrapper.state('error')).toBe('');
   // expect onSubmit to be called with the dummy expense data
   expect(onSubmitSpy).toHaveBeenLastCalledWith({
      description: expenses[0].description,
      amount: expenses[0].amount,
      note: expenses[0].note,
      createdAt: expenses[0].createdAt
   });
});

test('should set new date on date change', () => {
   const now = moment();
   const wrapper = shallow(<ExpenseForm />);
   // call onDateChange on SIngleDatePicker
   wrapper.find('SingleDatePicker').prop('onDateChange')(now);

   expect(wrapper.state('createdAt')).toEqual(now);
});


test('Should set calender focus on change', () => {
   const focused = true;
   const wrapper = shallow(<ExpenseForm />);
   // call onFocusChange on SIngleDatePicker
   wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });

   expect(wrapper.state('calenderFocused')).toEqual(focused);
});