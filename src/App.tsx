/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import {HomeScreen} from './screens/HomeScreen';

export const App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}} testID="app">
      <HomeScreen />
    </SafeAreaView>
  );
};
