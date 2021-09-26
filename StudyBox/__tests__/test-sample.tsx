// __tests__/Intro-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Intro from './sample';

test('renders correctly', () => {
  const tree = renderer.create(<Intro />).toJSON();
  expect(tree).toMatchSnapshot();
});
