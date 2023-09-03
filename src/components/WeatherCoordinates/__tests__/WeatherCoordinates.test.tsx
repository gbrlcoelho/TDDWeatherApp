import {render} from '@testing-library/react-native';
import React from 'react';
import WeatherCoordinates from '../WeatherCoordinates';

describe('WeatherCoordinates', () => {
  it('Should render correctly', () => {
    const {getByTestId} = render(<WeatherCoordinates />);

    expect(getByTestId('weather-coordinates')).toBeDefined();
  });
});
