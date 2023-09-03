import {render} from '@testing-library/react-native';
import React from 'react';
import {View} from 'react-native';
import WeatherCoordinates from '../../../components/WeatherCoordinates/WeatherCoordinates';
import WeatherCurrent from '../../../components/WeatherCurrent/WeatherCurrent';
import HomeScreen from '../HomeScreen';

jest.mock('../../../components/WeatherCurrent/WeatherCurrent.tsx', () =>
  jest.fn().mockReturnValue(null),
);

jest.mock('../../../components/WeatherCoordinates/WeatherCoordinates.tsx', () =>
  jest.fn().mockReturnValue(null),
);

describe('HomeScreen', () => {
  it('Should render correctly', () => {
    const {getByTestId} = render(<HomeScreen />);
    expect(getByTestId('home-screen')).toBeDefined();
  });

  describe('Title section', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(946684800000);
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('Should contain current date', async () => {
      const {getByText} = render(<HomeScreen />);

      expect(getByText('Jan 01, 2000')).toBeDefined();
    });

    it('Should contain current day', () => {
      const {getByText} = render(<HomeScreen />);

      expect(getByText('Saturday')).toBeDefined();
    });
  });
  it('Should contain a section to get current weather', () => {
    (WeatherCurrent as jest.Mock).mockReturnValue(
      <View testID="mock-weather-current" />,
    );

    const {getByTestId} = render(<HomeScreen />);

    expect(getByTestId('mock-weather-current')).toBeDefined();
  });

  it('Should contain a divider', () => {
    const {getByTestId} = render(<HomeScreen />);

    expect(getByTestId('home-screen-divider')).toBeDefined();
  });

  it('Should contain a section to weather at given latitude & longitude', () => {
    (WeatherCoordinates as jest.Mock).mockReturnValue(
      <View testID="mock-weather-coordinates" />,
    );

    const {getByTestId} = render(<HomeScreen />);

    expect(getByTestId('mock-weather-coordinates')).toBeDefined();
  });
});
