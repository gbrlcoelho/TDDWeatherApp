import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import WeatherCoordinates from '../../components/WeatherCoordinates/WeatherCoordinates';
import WeatherCurrent from '../../components/WeatherCurrent/WeatherCurrent';
import {Colors} from './constants';

const HomeScreen = () => {
  const now = moment(new Date());

  return (
    <LinearGradient
      colors={[Colors.LIGHT_GRAY, Colors.DARKER_GRAY]}
      testID="home-screen"
      style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.date}> {now.format('MMM DD, YYYY')}</Text>
        <Text style={styles.day}>{now.format('dddd')}</Text>
      </View>
      <WeatherCoordinates />
      <Text testID="home-screen-divider" style={styles.divider}>
        Or
      </Text>
      <WeatherCurrent />
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    alignContent: 'space-between',
    justifyContent: 'space-evenly',
  },
  title: {
    justifyContent: 'flex-end',
  },
  date: {
    color: Colors.GRAY,
    fontSize: 13,
  },
  day: {
    color: Colors.WHITE,
    fontSize: 21,
  },
  divider: {
    color: Colors.WHITE,
    textAlign: 'center',
  },
});
