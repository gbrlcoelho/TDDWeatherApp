import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  fetchWeather,
  fetchWeatherFailure,
  fetchWeatherSuccess,
} from '../../../store/weather/actions';
import {nullWeather} from '../../../types/Weather';
import {
  act,
  fireEvent,
  mockStore,
  render,
  waitFor,
} from '../../../utils/test.utils';
import WeatherScreen from '../WeatherScreen';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual<object>('@react-navigation/native'),
    useNavigation: jest.fn().mockReturnValue({goBack: jest.fn()}),
    useRoute: jest.fn().mockReturnValue({params: {longitude: 0, latitude: 0}}),
  };
});

describe('WeatherScreen', () => {
  it('should render correctly', () => {
    const {getByTestId} = render(<WeatherScreen />, {store: mockStore()});

    expect(getByTestId('weather-screen')).toBeDefined();
  });

  it('Should return to HomeScreen when button home is pressed', () => {
    const mockGoBack = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({goBack: mockGoBack});

    const {getByText} = render(<WeatherScreen />, {store: mockStore()});

    const button = getByText('Home');

    fireEvent.press(button);
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('Should fetch weather', async () => {
    const interceptor = jest.fn();
    const store = mockStore(interceptor);

    render(<WeatherScreen />, {store});

    await waitFor(() => {
      expect(interceptor).toHaveBeenCalledWith(fetchWeather(0, 0));
    });
  });

  it('Should display loader when fetching weather', async () => {
    const {getByTestId} = render(<WeatherScreen />, {store: mockStore()});
    expect(getByTestId('weather-screen-loader')).toBeDefined();
  });

  it('Should display given error', () => {
    const store = mockStore();
    const {getByText} = render(<WeatherScreen />, {store});

    act(() => {
      store.dispatch(fetchWeatherFailure('mock-error'));
    });

    expect(getByText('mock-error')).toBeDefined();
  });

  it('Should display image with given weather icon', () => {
    const store = mockStore();
    const {getByTestId} = render(<WeatherScreen />, {store});

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, icon: 'mock-icon'}));
    });

    const image = getByTestId('weather-screen-icon');

    expect(image).toHaveProp('source', {uri: 'mock-icon'});
  });

  it('Should not display icon when weather has no icon', () => {
    const store = mockStore();
    const {getByTestId} = render(<WeatherScreen />, {store});

    act(() => {
      store.dispatch(fetchWeatherSuccess(nullWeather));
    });

    expect(() => getByTestId('weather-screen-icon')).toThrow();
  });

  it('Should display description from given weather', () => {
    const store = mockStore();
    const {getByText} = render(<WeatherScreen />, {store});

    act(() => {
      store.dispatch(
        fetchWeatherSuccess({...nullWeather, description: 'mock-description'}),
      );
    });

    expect(getByText('mock-description')).toBeDefined();
  });

  it('Should not display description when weather has no description', () => {
    const store = mockStore();
    const {getByTestId} = render(<WeatherScreen />, {store});

    act(() => {
      store.dispatch(fetchWeatherSuccess(nullWeather));
    });

    expect(() => getByTestId('weather-screen-description')).toThrow();
  });

  it('Should display city name from given weather', () => {
    const store = mockStore();
    const {getByText} = render(<WeatherScreen />, {store});

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, city: 'mock-city'}));
    });

    expect(getByText('mock-city')).toBeDefined();
  });

  it('Should display formatted temperature', () => {
    const store = mockStore();
    const {getByTestId, getByText} = render(<WeatherScreen />, {store});

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, temperature: 10.8}));
    });

    const container = getByTestId('weather-screen-temperature');
    const title = getByText('Temperature');
    const temperature = getByText('11°C');

    expect(container).toContainElement(title);
    expect(container).toContainElement(temperature);
  });

  it('Should display formatted wind', () => {
    const store = mockStore();
    const {getByTestId, getByText} = render(<WeatherScreen />, {store});

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, windSpeed: 1}));
    });

    const container = getByTestId('weather-screen-wind');
    const title = getByText('Wind');
    const wind = getByText('1m/s');

    expect(container).toContainElement(title);
    expect(container).toContainElement(wind);
  });

  it('Should display formatted humidity', () => {
    const store = mockStore();
    const {getByTestId, getByText} = render(<WeatherScreen />, {store});

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, humidity: 15}));
    });

    const container = getByTestId('weather-screen-humidity');
    const title = getByText('Humidity');
    const humidity = getByText('15%');

    expect(container).toContainElement(title);
    expect(container).toContainElement(humidity);
  });

  it('Should display formatted pressure', () => {
    const store = mockStore();
    const {getByTestId, getByText} = render(<WeatherScreen />, {store});

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, pressure: 1000}));
    });

    const container = getByTestId('weather-screen-pressure');
    const title = getByText('Pressure');
    const pressure = getByText('1000 hPa');

    expect(container).toContainElement(title);
    expect(container).toContainElement(pressure);
  });
});
