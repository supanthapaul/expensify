import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';

test('Should render Header correctly', () => {
   //snapshot testing
   // https://facebook.github.io/jest/docs/en/expect.html#tomatchsnapshotpropertymatchers-snapshotname

   // Enzyme docs - http://airbnb.io/enzyme/docs/api/shallow.html
   const wrapper = shallow(<Header />);
   expect(wrapper).toMatchSnapshot();
});


