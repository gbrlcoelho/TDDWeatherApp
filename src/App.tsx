import React from 'react';
import {SafeAreaView} from 'react-native';
import Router from './Routes/Router';

export const App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}} testID="app">
      <Router />
    </SafeAreaView>
  );
};
