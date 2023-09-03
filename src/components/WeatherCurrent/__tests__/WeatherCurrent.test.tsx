import {render} from '@testing-library/react-native';
import React from 'react';
import WeatherCurrent from '../WeatherCurrent';

describe('WeatherCurrent', () => {
  it('Should render correctly', () => {
    const {getByTestId} = render(<WeatherCurrent />);

    expect(getByTestId('weather-current')).toBeDefined();
  });
});
