import React from 'react';
import {View} from 'react-native';
import {render} from '../../utils/test.utils';
import store from '../index';

describe('Store', () => {
  it('Should be a valid store', () => {
    const {getByTestId} = render(<View testID="mock-component" />, {store});

    expect(getByTestId('mock-component')).toBeDefined();
  });
});
