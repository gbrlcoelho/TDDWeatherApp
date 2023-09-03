import {render} from '@testing-library/react-native';
import React from 'react';
import {HomeScreen} from '../HomeScreen';

describe('HomeScreen', () => {
  test('renders correctly', () => {
    const {getByTestId} = render(<HomeScreen />);
    expect(getByTestId('home-screen')).toBeDefined();
  });
});
