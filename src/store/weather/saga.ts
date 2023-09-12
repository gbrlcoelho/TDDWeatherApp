import {call, put, takeLatest} from 'redux-saga/effects';
import WeatherService from '../../service/WeatherService/WeatherService';
import {
  Actions,
  WEATHER_START_TYPE,
  fetchWeatherFailure,
  fetchWeatherSuccess,
} from './actions';

export default function* saga() {
  yield takeLatest(Actions.START, weatherStartWorker);
}

export function* weatherStartWorker(
  action: WEATHER_START_TYPE,
): Generator<any, void, any> {
  try {
    const weather = yield call(
      WeatherService.fetchCurrentWeather,
      action.payload.latitude,
      action.payload.longitude,
    );

    yield put(fetchWeatherSuccess(weather));
  } catch (error) {
    yield put(fetchWeatherFailure((error as Error).message));
  }
}
