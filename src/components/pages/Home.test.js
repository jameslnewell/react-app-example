import React from 'react';
import {shallow} from 'enzyme';
import Home from './Home';
import Heading from '../Heading';

describe('Home', () => {
  test('title is "Home"', () => {
    const page = shallow(<Home />);
    expect(page.find(Heading).children().text()).toEqual('Home');
  });
});
