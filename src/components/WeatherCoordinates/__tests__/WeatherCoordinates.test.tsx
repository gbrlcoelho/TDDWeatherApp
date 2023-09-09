import {useNavigation} from '@react-navigation/native';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import WeatherCoordinates from '../WeatherCoordinates';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual<object>('@react-navigation/native'),
    useNavigation: jest.fn(() => ({navigate: jest.fn()})),
  };
});

describe('WeatherCoordinates', () => {
  it('Should render correctly', () => {
    const {getByTestId} = render(<WeatherCoordinates />);

    expect(getByTestId('weather-coordinates')).toBeDefined();
  });

  it('Should navigate to Weather screen with given coordinates when valid form is submitted', async () => {
    const mockNavigate = jest.fn();

    (useNavigation as jest.Mock).mockReturnValueOnce({navigate: mockNavigate});

    const {getByTestId} = render(<WeatherCoordinates />);

    const fields = {
      latitude: getByTestId('weather-coordinates-latitude'),
      longitude: getByTestId('weather-coordinates-longitude'),
    };

    fireEvent.changeText(fields.latitude, '0');
    fireEvent.changeText(fields.longitude, '0');

    fireEvent.press(getByTestId('button'));

    await waitFor(() => {
      expect(mockNavigate).toBeCalledWith('WeatherScreen', {
        latitude: 0,
        longitude: 0,
      });
    });
  });

  describe('Latitude field', () => {
    it('Should not show error when value is the lowest range value', () => {
      const {getByTestId, findByText} = render(<WeatherCoordinates />);

      fireEvent.changeText(getByTestId('weather-coordinates-latitude'), '-90');

      return expect(
        findByText('Latitude must be a valid number'),
      ).rejects.toThrow();
    });

    it('Should not show error when value is the highest range value', () => {
      const {getByTestId, findByText} = render(<WeatherCoordinates />);

      fireEvent.changeText(getByTestId('weather-coordinates-latitude'), '90');

      return expect(
        findByText('Latitude must be a valid number'),
      ).rejects.toThrow();
    });
  });
});
