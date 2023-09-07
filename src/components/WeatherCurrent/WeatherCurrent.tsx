import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '../../screens/HomeScreen/constants';
import LocationService from '../../service/LocationService/LocationService';
import Button from '../Button/Button';

const WeatherCurrent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {navigate} = useNavigation();

  const handleFetchWeather = useCallback(async () => {
    try {
      setError(false);
      setLoading(true);
      const {latitude, longitude} = await LocationService.getCurrentPosition();
      navigate('WeatherScreen', {latitude, longitude});
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return (
    <Button
      testID="weather-current"
      label="Weather at my position"
      onPress={handleFetchWeather}
      loading={loading}
      style={error && styles.error}
    />
  );
};

const styles = StyleSheet.create({
  error: {
    borderColor: Colors.ERROR,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default WeatherCurrent;
