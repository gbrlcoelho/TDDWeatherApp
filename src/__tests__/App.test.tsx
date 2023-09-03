import React from 'react';

import {render} from '@testing-library/react-native';

import App from '../App';

describe('App', () => {
  test('Should render correctly', () => {
    const {getByTestId} = render(<App />);

    expect(getByTestId('app')).toBeDefined();
  });
});
