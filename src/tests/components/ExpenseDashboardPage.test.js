import React from 'react';
import { shallow } from 'enzyme';
import ExpenseDashboardPage from '../../components/ExpenseDashboardPage';

test('Should render ExpenseDashboardPage correctly', () => {

   // Enzyme docs - http://airbnb.io/enzyme/docs/api/shallow.html
   const wrapper = shallow(<ExpenseDashboardPage />);
   expect(wrapper).toMatchSnapshot();
});
