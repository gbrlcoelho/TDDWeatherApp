import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import Router from './Routes/Router';
import {Colors} from './screens/HomeScreen/constants';
import store from './store';

export const App = () => {
  return (
    <SafeAreaView style={styles.container} testID="app">
      <Provider store={store}>
        <Router />
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DARKER_GRAY,
  },
});
