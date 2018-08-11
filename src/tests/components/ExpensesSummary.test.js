import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('Should render ExpensesSummary correctly with 1 expense', () => {
   const wrapper = shallow(<ExpensesSummary
      expensesCount={1}
      expensesTotal={195} />);

   expect(wrapper).toMatchSnapshot();
});

test('Should render ExpensesSummary correctly with multiple expenses', () => {
   const wrapper = shallow(<ExpensesSummary
      expensesCount={2}
      expensesTotal={12132323} />);

   expect(wrapper).toMatchSnapshot();
});