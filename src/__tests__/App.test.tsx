import {render} from '@testing-library/react-native';
import React from 'react';
import {View} from 'react-native';
import {App} from '../App';
import Router from '../Routes/Router';

jest.mock('../Routes/Router', () => jest.fn());

describe('App', () => {
  it('Should render Router', () => {
    (Router as jest.Mock).mockReturnValueOnce(<View testID="mock-router" />);

    const {getByTestId} = render(<App />);

    expect(getByTestId('mock-router')).toBeDefined();
  });
});
