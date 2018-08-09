import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '../../components/NotFoundPage';

test('Should render NotFoundPage correctly', () => {
   // Enzyme docs - http://airbnb.io/enzyme/docs/api/shallow.html
   const wrapper = shallow(<NotFoundPage />);
   expect(wrapper).toMatchSnapshot();
});
