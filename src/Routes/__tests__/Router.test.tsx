import {useNavigation} from '@react-navigation/native';
import {act, render, waitFor} from '@testing-library/react-native';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import WeatherScreen from '../../screens/WeatherScreen/WeatherScreen';
import Router from '../Router';

jest.mock('../../screens/HomeScreen/HomeScreen', () => jest.fn());
jest.mock('../../screens/WeatherScreen/WeatherScreen', () => jest.fn());

describe('Router', () => {
  it('Should render HomeScreen by default', async () => {
    (HomeScreen as jest.Mock).mockReturnValueOnce(
      <View testID="mock-home-screen" />,
    );

    const {getByTestId} = render(<Router />);

    await waitFor(() => {
      expect(getByTestId('mock-home-screen')).toBeDefined();
    });
  });

  it('Should render WeatherScreen on "Weather" route', async () => {
    (HomeScreen as jest.Mock).mockImplementationOnce(() => {
      const navigation = useNavigation();

      useEffect(() => {
        act(() => {
          navigation.navigate('WeatherScreen', {
            latitude: 0,
            longitude: 0,
          });
        });
      }, [navigation]);

      return null;
    });

    (WeatherScreen as jest.Mock).mockReturnValueOnce(
      <View testID="mock-weather-screen" />,
    );

    const {getByTestId} = render(<Router />);

    await waitFor(() => {
      expect(getByTestId('mock-weather-screen')).toBeDefined();
    });
  });
});
