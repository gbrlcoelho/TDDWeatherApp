import React from 'react';

import {create} from 'react-test-renderer';

import App from '../App';

describe('App', () => {
  test('Should render correctly', () => {
    create(<App />);
  });
});
