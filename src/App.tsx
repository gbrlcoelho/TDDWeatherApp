import React from 'react';
import {SafeAreaView} from 'react-native';
import {HomeScreen} from './screens/HomeScreen/HomeScreen';

export const App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}} testID="app">
      <HomeScreen />
    </SafeAreaView>
  );
};
