import {render} from '@testing-library/react-native';
import React from 'react';
import WeatherScreen from '../WeatherScreen';

describe('WeatherScreen', () => {
  it('should render correctly', () => {
    const {getByTestId} = render(<WeatherScreen />);

    expect(getByTestId('weather-screen')).toBeDefined();
  });
});
