import {useNavigation} from '@react-navigation/native';
import {
  act,
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import React from 'react';
import {Colors} from '../../../screens/HomeScreen/constants';
import LocationService from '../../../service/LocationService/LocationService';
import WeatherCurrent from '../WeatherCurrent';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(() => ({navigate: jest.fn()})),
  };
});

describe('WeatherCurrent', () => {
  it('Should render correctly', () => {
    const {getByTestId} = render(<WeatherCurrent />);

    expect(getByTestId('weather-current')).toBeDefined();
  });

  it('Should render label', () => {
    const {getByText} = render(<WeatherCurrent />);

    expect(getByText('Weather at my position')).toBeDefined();
  });

  it('Should navigate to Weather screen with location', async () => {
    const mockNavigate = jest.fn();

    (useNavigation as jest.Mock).mockReturnValueOnce({navigate: mockNavigate});

    const {getByTestId} = render(<WeatherCurrent />);

    fireEvent.press(getByTestId('weather-current'));

    await waitFor(() => {
      expect(mockNavigate).toBeCalledWith('WeatherScreen', {
        latitude: 0,
        longitude: 0,
      });
    });
  });

  describe('Loader', () => {
    it('Should be rendered when position is being fetched', async () => {
      let mockResolve!: (position: {
        latitude: number;
        longitude: number;
      }) => void;

      jest.spyOn(LocationService, 'getCurrentPosition').mockImplementationOnce(
        () =>
          new Promise(resolve => {
            mockResolve = resolve;
          }),
      );

      const {getByTestId} = render(<WeatherCurrent />);

      fireEvent.press(getByTestId('weather-current'));

      await waitFor(() => {
        expect(getByTestId('button-loading')).toBeDefined();
      });

      await act(async () => {
        await mockResolve({latitude: 0, longitude: 0});
      });
    });

    it('Should not be rendered when position has been fetched', async () => {
      const {getByTestId} = render(<WeatherCurrent />);

      fireEvent.press(getByTestId('weather-current'));

      return waitForElementToBeRemoved(() => getByTestId('button-loading'));
    });

    it('Should not be rendered when fetching position has failed', async () => {
      jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockRejectedValueOnce(new Error(''));

      const {getByTestId} = render(<WeatherCurrent />);

      fireEvent.press(getByTestId('weather-current'));

      return waitForElementToBeRemoved(() => getByTestId('button-loading'));
    });
  });

  describe('Error', () => {
    it('Should be displayed after fetching position has failed', async () => {
      jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockRejectedValueOnce(new Error(''));

      const {getByTestId} = render(<WeatherCurrent />);
      fireEvent.press(getByTestId('weather-current'));

      await waitFor(() => {
        expect(getByTestId('weather-current')).toHaveStyle({
          borderColor: Colors.ERROR,
        });
      });
    });

    it('Should be removed after fetching position has succeeded', async () => {
      jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockRejectedValueOnce(new Error(''));

      const {getByTestId} = render(<WeatherCurrent />);

      fireEvent.press(getByTestId('weather-current'));

      await waitFor(() => {
        fireEvent.press(getByTestId('weather-current'));

        expect(getByTestId('weather-current')).not.toHaveStyle({
          borderColor: Colors.ERROR,
        });
      });
    });
  });
});
