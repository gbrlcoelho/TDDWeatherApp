import {render} from '@testing-library/react-native';
import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';

import {App} from '../App';
import Router from '../Routes/Router';
import store from '../store';

jest.mock('../Routes/Router', () => jest.fn());
jest.mock('react-redux', () => {
  return {
    ...jest.requireActual<object>('react-redux'),
    Provider: jest.fn(),
  };
});

describe('App', () => {
  test('Should render routes', () => {
    (Provider as jest.Mock).mockImplementationOnce(({children}) => children);

    (Router as jest.Mock).mockReturnValueOnce(<View testID="mock-routes" />);
    const {getByTestId} = render(<App />);
    getByTestId('mock-routes');
  });

  test('Should render Provider', () => {
    let providerStore!: typeof store;

    (Provider as jest.Mock).mockImplementationOnce(({store: mockStore}) => {
      providerStore = mockStore;
      return <View testID="mock-provider" />;
    });

    const {getByTestId} = render(<App />);
    getByTestId('mock-provider');
    expect(providerStore).toBe(store);
  });
});
