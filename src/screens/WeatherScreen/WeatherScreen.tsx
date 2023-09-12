/* eslint-disable @typescript-eslint/no-shadow */
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {RootStackParamList} from '../../routes/Router';
import {StateType} from '../../store/reducers';
import {fetchWeather} from '../../store/weather/actions';
import {Status} from '../../types/Status';
import {WeatherType} from '../../types/Weather';
import {Colors} from '../HomeScreen/constants';

type WeatherScreenRouteProp = RouteProp<RootStackParamList, 'WeatherScreen'>;

type StateProps = {
  weather: WeatherType;
  status: Status;
  error: string;
};

type DispatchProps = {
  fetchWeather: typeof fetchWeather;
};

type Props = StateProps & DispatchProps;

const WeatherScreen = (props: Props) => {
  const {fetchWeather, status, error, weather} = props;
  const {params} = useRoute<WeatherScreenRouteProp>();
  const {goBack} = useNavigation();

  useEffect(() => {
    fetchWeather(params.latitude, params.longitude);
  }, [fetchWeather, params.latitude, params.longitude]);

  return (
    <View style={styles.container} testID="weather-screen">
      <TouchableOpacity style={styles.back} onPress={goBack}>
        <Text style={styles.backText}>Home</Text>
      </TouchableOpacity>
      {status === Status.LOADING && (
        <ActivityIndicator
          size="large"
          color={Colors.DARKER_GRAY}
          testID="weather-screen-loader"
        />
      )}
      {status === Status.FAILURE && <Text style={styles.error}>{error}</Text>}
      {status === Status.SUCCESS && (
        <>
          <View style={styles.head}>
            {weather.icon && (
              <Image
                testID="weather-screen-icon"
                style={styles.icon}
                source={{uri: weather.icon}}
              />
            )}
            <Text style={styles.city}>{weather.city}</Text>
            {weather.description && (
              <Text
                style={styles.description}
                testID="weather-screen-description">
                {weather.description}
              </Text>
            )}
          </View>
          <View style={styles.stats}>
            <Text style={styles.statsTitle}>Stats</Text>
            <View
              testID="weather-screen-temperature"
              style={[styles.card, styles.cardNegative]}>
              <Text style={styles.cardTextNegative}>Temperature</Text>
              <Text style={styles.cardTextNegative}>
                {Math.round(weather.temperature)}°C
              </Text>
            </View>
            <View testID="weather-screen-wind" style={styles.card}>
              <Text style={styles.cardText}>Wind</Text>
              <Text style={styles.cardText}>{weather.windSpeed}m/s</Text>
            </View>
            <View
              testID="weather-screen-humidity"
              style={[styles.card, styles.cardNegative]}>
              <Text style={styles.cardTextNegative}>Humidity</Text>
              <Text style={styles.cardTextNegative}>{weather.humidity}%</Text>
            </View>
            <View testID="weather-screen-pressure" style={styles.card}>
              <Text style={styles.cardText}>Pressure</Text>
              <Text style={styles.cardText}>{weather.pressure} hPa</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.WHITE,
  },
  back: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backText: {
    fontSize: 24,
  },
  error: {
    color: Colors.ERROR,
    textAlign: 'center',
  },
  head: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    width: 200,
    height: 200,
  },
  city: {
    fontSize: 48,
  },
  description: {
    fontSize: 24,
    textTransform: 'capitalize',
  },
  stats: {
    paddingHorizontal: '10%',
  },
  statsTitle: {
    fontSize: 13,
    color: Colors.LIGHTER_GRAY,
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
  },
  cardNegative: {
    backgroundColor: Colors.BLUE,
  },
  cardTextNegative: {
    color: Colors.WHITE,
  },
  cardText: {
    color: Colors.LIGHTER_GRAY,
  },
});

export default connect<StateProps, DispatchProps, {}, StateType>(
  state => ({
    status: state.weather.status,
    weather: state.weather.weather,
    error: state.weather.error,
  }),
  {
    fetchWeather,
  },
)(WeatherScreen);
